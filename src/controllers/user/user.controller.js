import mongoose from 'mongoose';

import { User, UserReport, Friend, Notification, UserBlock, GroupMember } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import {
  FRIEND_STATUS,
  NOTIFICATION_TYPE,
  NOTIFICATION_LABEL,
  USER_STATUS,
  NOTIFICATION_TYPE_ID,
} from '../../constants';
import AuthService from '../../../services/auth';
import FirebaseAdminService from '../../../services/firebaseadmin';
import TwilioService from '../../../services/twilio';

export const findAll = async (req, res) => {
  try {
    const {
      elementsPerPage = 10,
      currentPage = 1,
      search = '',
      orderBy = { createdAt: 'desc' },
    } = req.query;

    const page = parseInt(currentPage);
    const offset = elementsPerPage * (page - 1);

    let filter = {};

    if (search) filter.username = { $regex: new RegExp(search, 'i') };

    const users = await User.find(filter)
      .select('id username picture')
      .limit(elementsPerPage)
      .skip(offset)
      .sort(orderBy);

    const count = await User.countDocuments({});

    return successResponse(req, res, { list: users, count });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: me } = req.user;

    let user = await User.findOne({ _id: id });
    user = user.toJSON();

    const isFriend = await Friend.findOne({
      $or: [{ friends: [id, me] }, { friends: [me, id] }],
    }).lean();

    const item = {
      ...user,
      isFriend: isFriend ? { status: isFriend.status, friends: isFriend.friends } : null,
    };

    return successResponse(req, res, { item });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, email, firebaseUid } = req.user;
    const data = req.body;

    if (data.email !== email) {
      await AuthService.updateEmail(firebaseUid, data.email);
    }

    await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return successResponse(req, res, { account: data });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportAnotherUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId, reason } = req.body;

    await User.updateOne(
      { _id: userId },
      {
        status: USER_STATUS.REPORTED,
      },
    );

    await UserReport.create([
      {
        from: id,
        reason,
        to: userId,
      },
    ]);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const blockAnotherUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.user;
    const { userId } = req.body;

    await UserBlock({
      from: id,
      to: userId,
    }).save({ session });

    await User.updateOne({ _id: id }, { $push: { blocked: userId } }, { session });

    await session.commitTransaction();

    return successResponse(req, res, { item: { id: userId } });
  } catch (error) {
    await session.abortTransaction();
    return errorResponse(req, res, error);
  } finally {
    session.endSession();
  }
};

export const unblockUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: me } = req.user;
    const { id: userId } = req.params;

    await UserBlock.deleteOne({ from: me, to: userId }, { session });
    await User.updateOne({ _id: me }, { $pull: { blocked: userId } }, { session });

    await session.commitTransaction();

    return successResponse(req, res, { item: { id: userId } });
  } catch (error) {
    await session.abortTransaction();
    return errorResponse(req, res, error);
  } finally {
    session.endSession();
  }
};

export const findAllBlockedUsers = async (req, res) => {
  try {
    const { elementsPerPage = 10, currentPage = 1, orderBy = { createdAt: 'asc' } } = req.query;

    const { id } = req.user;

    const page = parseInt(currentPage);
    const offset = elementsPerPage * (page - 1);

    const list = await UserBlock.find({ from: id })
      .populate('to', 'name username picture id')
      .limit(elementsPerPage)
      .skip(offset)
      .sort(orderBy);

    const count = await UserBlock.countDocuments({ from: id });

    return successResponse(req, res, {
      list,
      count,
      totalPages: Math.ceil(count / elementsPerPage),
      hasNextPage: currentPage < Math.ceil(count / elementsPerPage),
      currentPage,
    });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.body;

    const areFriends = await Friend.findOne({
      $or: [{ friends: [userId, id] }, { friends: [id, userId] }],
    });

    if (areFriends)
      throw new Error(
        areFriends.status == FRIEND_STATUS.ACCEPTED
          ? 'Users are already friends.'
          : 'Invitation aready sent.',
      );

    await FirebaseAdminService.sendNotification(
      userId,
      req.user, // owner
      NOTIFICATION_TYPE.REQUEST,
      NOTIFICATION_TYPE_ID.FRIEND_REQUEST,
      NOTIFICATION_LABEL.ADD_FRIEND,
    );

    const isFriend = await Friend.create({
      requester: id,
      recipient: userId,
      friends: [id, userId],
      status: FRIEND_STATUS.PENDING,
    });

    return successResponse(req, res, { isFriend });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFriends = async (req, res) => {
  try {
    const { id: meId } = req.user;

    const {
      elementsPerPage = 10,
      currentPage = 1,
      search = '',
      groupId = null,
      orderBy = { createdAt: 'desc' },
    } = req.query;

    const page = parseInt(currentPage);
    const offset = elementsPerPage * (page - 1);

    const aggregate = [
      {
        $match: { friends: { $in: [meId] } },
      },
      {
        $lookup: {
          from: 'users',
          let: { friends: '$friends', requester: '$requester', recipient: '$recipient' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $cond: {
                    if: { $eq: [{ $first: '$$friends' }, meId] },
                    then: { $eq: ['$$recipient', '$_id'] },
                    else: { $eq: ['$$requester', '$_id'] },
                  },
                },
              },
            },
            { $project: { username: 1, _id: 1, name: 1, picture: 1 } },
          ],
          as: 'friend',
        },
      },
      {
        $project: {
          user: {
            $arrayElemAt: ['$friend', 0],
          },
          _id: 0,
        },
      },
    ];

    let options = null;

    if (search) {
      options = { ...options, 'user.username': { $regex: '.*' + search + '.*', $options: 'i' } };
    }

    if (options) aggregate.push({ $match: options });

    const data = Friend.aggregate(aggregate);

    const paginate = await Friend.aggregatePaginate(data, {
      page,
      limit: elementsPerPage,
      offset,
      countQuery: Friend.aggregate(aggregate),
    });

    const list = await Promise.all(
      paginate?.docs?.map(async ({ user }) => {
        let isMember = false;
        if (groupId) {
          isMember = await GroupMember.findOne({ user: user._id, group: groupId }).lean();
          return { ...user, isMember: !!isMember };
        } else {
          return user;
        }
      }),
    );

    return successResponse(req, res, {
      list,
      count: paginate.totalDocs,
      totalPages: paginate.totalPages,
      currentPage: paginate.page,
      hasPrevPage: paginate.hasPrevPage,
      hasNextPage: paginate.hasNextPage,
    });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateFriendRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: me } = req.user;
    const { status, userId, id: notificationId } = req.body;

    const invitation = await Friend.findOne({
      requester: userId,
      recipient: me,
      status: FRIEND_STATUS.PENDING,
    });

    if (!invitation) return errorResponse(req, res, new Error('Invitation not found.'), 404);

    if (status == FRIEND_STATUS.ACCEPTED) {
      await Friend.updateOne({ _id: invitation.id }, { status }, { session });
      await User.updateOne({ _id: me }, { $inc: { friendsCount: 1 } }, { session });
      await User.updateOne({ _id: userId }, { $inc: { friendsCount: 1 } }, { session });

      await FirebaseAdminService.sendNotification(
        userId,
        req.user, // owner
        NOTIFICATION_TYPE.REQUEST,
        NOTIFICATION_TYPE_ID.FRIEND_REQUEST_ACCEPTED,
        NOTIFICATION_LABEL.ANSWER_FRIEND_REQUEST,
      );
    } else {
      await Friend.deleteOne({ _id: invitation.id }, { session }); // Rejected
    }

    if (notificationId) {
      await Notification.updateOne({ _id: notificationId }, { answered: true });
    } else {
      await Notification.updateOne(
        {
          type: NOTIFICATION_TYPE.REQUEST,
          typeId: NOTIFICATION_TYPE_ID.FRIEND_REQUEST,
          answered: false,
          owner: userId,
          user: me,
        },
        { answered: true },
      );
    }

    await session.commitTransaction();

    return successResponse(req, res, { success: true });
  } catch (error) {
    await session.abortTransaction();
    return errorResponse(req, res, error);
  } finally {
    session.endSession();
  }
};

export const unfriend = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: me } = req.user;
    const { id: user } = req.params;

    const areFriends = await Friend.findOne({
      $or: [{ friends: [user, me] }, { friends: [me, user] }],
    }).lean();

    if (!areFriends) return errorResponse(req, res, new Error('You are not a friend.'), 404);

    await Friend.deleteOne({ _id: areFriends._id }, { session }); // Delete relationship
    await User.updateOne({ _id: me }, { $inc: { friendsCount: -1 } }, { session });
    await User.updateOne({ _id: user }, { $inc: { friendsCount: -1 } }, { session });

    await session.commitTransaction();

    return successResponse(req, res, { item: { user } });
  } catch (error) {
    await session.abortTransaction();
    return errorResponse(req, res, error);
  } finally {
    session.endSession();
  }
};

export const inviteFriends = async (req, res) => {
  try {
    const { contacts } = req.body;

    contacts.map((phoneNumber) => {
      TwilioService.sendSms(
        `Join to My Side! It's a fast, simple, and secure app we can use to post content, message each other for free. Get it at https://myside.io`,
        phoneNumber,
      );
    });

    return successResponse(req, res, { success: true });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
