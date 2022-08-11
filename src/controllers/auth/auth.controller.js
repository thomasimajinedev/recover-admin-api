import crypto from 'crypto';
import mongoose from 'mongoose';
import axios from 'axios';
import Cryptr from 'cryptr';
import { User } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import AuthService from '../../services/auth';
import config from '../../config';

const cryptr = new Cryptr(config.secretKey);

export const register = async (req, res) => {
  try {
    const {
      email,
      picture,
      birthDate,
      phoneNumber,
      role,
      firstName,
      middleName,
      lastName,
      genderIdentity,
      genderBiological,
      state,
      city,
      address,
      apartment,
      zipcode,
      recoveryEmail,
      password,
    } = req.body;
    const userExists = await User.findOne({ $or: [{ email }] });

    if (userExists) {
      throw new Error('User already exists with the same email or username');
    }
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    // Create user
    await User({
      email,
      password: hashedPassword,
      picture,
      birthDate,
      phoneNumber,
      role,
      firstName,
      middleName,
      lastName,
      genderIdentity,
      genderBiological,
      state,
      city,
      address,
      apartment,
      zipcode,
      recoveryEmail,
    }).save();

    return successResponse(req, res, {
      success: true,
    });
  } catch (error) {
    error = new Error(error.message);

    return errorResponse(req, res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const reqPass = crypto
      .createHash('md5')
      .update(password || '')
      .digest('hex');

    let user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      throw new Error('Incorrect Username or Password');
    }

    if (reqPass != user.password) {
      throw new Error('Incorrect Email Id/Password');
    }

    // if (user.status == USER_STATUS.SUSPENDED || user.status == USER_STATUS.BLOCKED) {
    //   throw new Error('You are not authorized to access on the platform, please contact Support.');
    // }

    const token = AuthService.generateJWT(user);

    return successResponse(req, res, {
      account: user,
      token,
    });
  } catch (error) {
    error = new Error(error?.response?.data?.error || error.message);

    return errorResponse(req, res, error);
  }
};

// export const recoverPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ $or: [{ email }, { recoveryEmail: email }] });

//     if (!user) {
//       throw new Error('This email is not associated with an existing account.');
//     }

//     if (user.provider !== PROVIDERS.EMAIL) {
//       throw new Error(
//         'This account is linked to Google or Apple ID service, and the password can’t be recovered. Try to login with the service related.',
//       );
//     }

//     const token = await AuthService.generateTokenResetPassword(user.email);

//     const externalLink = await FirebaseAdminService.createDynamicLink(
//       `token=${token}`,
//       'reset-password',
//     );

//     const template = {
//       name: user.name,
//       subject: 'Reset password',
//       link: externalLink,
//     };

//     SendgridService.sendEmailWithTemplate(
//       email,
//       SENDGRID_EMAIL_TEMPLATE_ID.RESET_PASSWORD_REQUEST,
//       template,
//     );

//     return successResponse(req, res, { success: true });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;

//     await AuthService.resetPassword(token, password);

//     return successResponse(req, res, { success: true });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const changePassword = async (req, res) => {
//   try {
//     const { id } = req.user;
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findOne({ _id: id });

//     if (!user) {
//       return errorResponse(req, res, new Error('User not found.'), 404);
//     }

//     await AuthService.changePassword(user.email, currentPassword, newPassword);

//     return successResponse(req, res, { success: true });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

export const getMe = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  return successResponse(req, res, { user });
};
