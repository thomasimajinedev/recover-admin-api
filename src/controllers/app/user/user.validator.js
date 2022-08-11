import Joi from 'joi';
import { FRIEND_STATUS } from '../../../constants';

const { ACCEPTED, REJECTED } = FRIEND_STATUS;

export const findAll = {
  query: {
    elementsPerPage: Joi.number(),
    search: Joi.string().allow(null, ''),
    currentPage: Joi.number(),
    orderBy: Joi.array(),
  },
};

export const findOne = {
  params: {
    id: Joi.string().required(),
  },
};

export const updateProfile = {
  body: {},
};

export const reportAnotherUser = {
  body: {
    userId: Joi.string().required(),
    reason: Joi.string().required(),
  },
};

export const blockAnotherUser = {
  body: {
    userId: Joi.string().required(),
  },
};

export const unblockUser = {
  params: {
    id: Joi.string().required(),
  },
};

export const findAllBlockedUsers = {};

export const sendFriendRequest = {
  body: {
    userId: Joi.string().required(),
  },
};

export const updateFriendRequest = {
  body: {
    status: Joi.string().valid(ACCEPTED, REJECTED).required(),
    userId: Joi.string().required(),
  },
};

export const getFriends = {
  query: {
    elementsPerPage: Joi.number(),
    search: Joi.string().allow(null, ''),
    currentPage: Joi.number(),
    groupId: Joi.string().allow(null, ''),
  },
};

export const unfriend = {};

export const inviteFriends = {
  body: {},
};
