import crypto from 'crypto';
import mongoose from 'mongoose';
import axios from 'axios';
import Cryptr from 'cryptr';
import { User } from '../../../models';
import { successResponse, errorResponse } from '../../../helpers';

import config from '../../../config';

const cryptr = new Cryptr(config.secretKey);

// export const register = async (req, res) => {
//   let firebaseUid;
//   let stripeCustomer;
//   let matrixAccessToken;
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { username, password, phoneNumber, email, publicKeyBiometric, pushToken } = req.body;
//     const userExists = await User.findOne({ $or: [{ email }, { username }] });

//     if (userExists) {
//       throw new Error('User already exists with the same email or username');
//     }

//     // Register on Firebase
//     const {
//       user: { uid, accessToken, refreshToken },
//     } = await AuthService.EmailRegister(email, password);
//     firebaseUid = uid;

//     // Register on Stripe
//     const { id: customerId } = await StripeService.createCustomer({
//       user: username,
//       email,
//       phone: phoneNumber,
//     });

//     stripeCustomer = customerId;

//     // Register on Matrix
//     const matrixUsername = username + Math.random().toString(36).slice(2);
//     let matrixPassword = crypto.randomBytes(16).toString('hex');
//     const hashMatrixPassword = cryptr.encrypt(matrixPassword);

//     const { access_token, user_id: matrixUserId } = await MatrixService.register(
//       matrixUsername,
//       matrixPassword,
//     );

//     matrixAccessToken = access_token;

//     // Create user
//     let newUser = await User({
//       username,
//       matrixUserId,
//       matrixUsername,
//       matrixPassword: hashMatrixPassword,
//       firebaseUid,
//       phoneNumber,
//       email,
//       publicKeyBiometric,
//       accountCompleted: true,
//       provider: PROVIDERS.EMAIL,
//       stripeCustomer,
//       pushToken,
//     }).save({ session });

//     //Create external link
//     const externalLink = await FirebaseAdminService.createDynamicLink(
//       `userId=${newUser._id}`,
//       'user',
//     );

//     await User.updateOne(
//       { _id: newUser._id },
//       {
//         externalLink,
//       },
//       { session },
//     );

//     await session.commitTransaction();

//     return successResponse(req, res, {
//       account: newUser,
//       token: accessToken,
//       refreshToken,
//       matrixAccessToken,
//     });
//   } catch (error) {
//     if (firebaseUid) {
//       await AuthService.deleteUser(firebaseUid);
//     }

//     if (stripeCustomer) {
//       await StripeService.deleteCustomer(stripeCustomer);
//     }

//     error = new Error(error?.response?.data?.error || error.message);
//     await session.abortTransaction();

//     return errorResponse(req, res, error);
//   } finally {
//     session.endSession();
//   }
// };

// export const registered = async (req, res) => {
//   try {
//     const { provider, providerId } = req.body;

//     let user = await User.findOne({ provider, providerId });

//     return successResponse(req, res, { exist: !!user });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const loginWithApple = async (req, res) => {
//   let firebaseUid;
//   let stripeCustomer;
//   let matrixAccessToken;
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { token, nonce, username, phoneNumber, providerId, pushToken } = req.body;

//     const {
//       user: { uid, accessToken, refreshToken, displayName, email, photoURL },
//     } = await AuthService.appleLogin(token, nonce);

//     firebaseUid = uid;

//     let user = await User.findOne({ firebaseUid });

//     if (!user) {
//       // Register on Stripe
//       const { id: customerId } = await StripeService.createCustomer({
//         user: username,
//         email,
//         phone: phoneNumber,
//       });

//       stripeCustomer = customerId;

//       // Register on Matrix
//       const matrixUsername = username + Math.random().toString(36).slice(2);
//       let matrixPassword = crypto.randomBytes(16).toString('hex');
//       const hashMatrixPassword = cryptr.encrypt(matrixPassword);

//       const { access_token, user_id: matrixUserId } = await MatrixService.register(
//         matrixUsername,
//         matrixPassword,
//       );

//       matrixAccessToken = access_token;

//       user = await User({
//         username,
//         matrixUserId,
//         matrixUsername,
//         matrixPassword: hashMatrixPassword,
//         firebaseUid,
//         phoneNumber,
//         name: displayName,
//         email,
//         provider: PROVIDERS.APPLE,
//         providerId,
//         picture: photoURL,
//         stripeCustomer,
//         pushToken,
//       }).save({ session });

//       //Create external link
//       const externalLink = await FirebaseAdminService.createDynamicLink(
//         `userId=${user._id}`,
//         'user',
//       );

//       await User.updateOne(
//         { _id: user._id },
//         {
//           externalLink,
//         },
//         { session },
//       );

//       await session.commitTransaction();
//     } else {
//       await user.updateOne({ _id: user.id, pushToken });
//       await session.commitTransaction();
//     }

//     return successResponse(req, res, {
//       account: user,
//       token: accessToken,
//       refreshToken,
//       matrixAccessToken,
//     });
//   } catch (error) {
//     if (firebaseUid) {
//       await AuthService.deleteUser(firebaseUid);
//     }

//     if (stripeCustomer) {
//       await StripeService.deleteCustomer(stripeCustomer);
//     }

//     error = new Error(error?.response?.data?.error || error.message);
//     await session.abortTransaction();

//     return errorResponse(req, res, error);
//   } finally {
//     session.endSession();
//   }
// };

// export const loginWithGoogle = async (req, res) => {
//   let firebaseUid;
//   let stripeCustomer;
//   let matrixAccessToken;

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { token, username, phoneNumber, providerId, pushToken } = req.body;

//     const {
//       user: { uid, accessToken, refreshToken, displayName, email, photoURL },
//     } = await AuthService.googleLogin(token);

//     firebaseUid = uid;

//     firebaseUid = uid;

//     let user = await User.findOne({ firebaseUid });

//     if (!user) {
//       // Register on Stripe
//       const { id: customerId } = await StripeService.createCustomer({
//         user: username,
//         email,
//         phone: phoneNumber,
//       });

//       stripeCustomer = customerId;

//       // Register on Matrix
//       const matrixUsername = username + Math.random().toString(36).slice(2);
//       let matrixPassword = crypto.randomBytes(16).toString('hex');
//       const hashMatrixPassword = cryptr.encrypt(matrixPassword);

//       const { access_token, user_id: matrixUserId } = await MatrixService.register(
//         matrixUsername,
//         matrixPassword,
//       );

//       matrixAccessToken = access_token;

//       user = await User({
//         username,
//         matrixUserId,
//         matrixUsername,
//         matrixPassword: hashMatrixPassword,
//         firebaseUid,
//         phoneNumber,
//         name: displayName,
//         email,
//         provider: PROVIDERS.GOOGLE,
//         providerId,
//         picture: photoURL,
//         stripeCustomer,
//         pushToken,
//       }).save({ session });

//       //Create external link
//       const externalLink = await FirebaseAdminService.createDynamicLink(
//         `userId=${user._id}`,
//         'user',
//       );

//       await User.updateOne(
//         { _id: user._id },
//         {
//           externalLink,
//         },
//         { session },
//       );
//       await session.commitTransaction();
//     } else {
//       await user.updateOne({ _id: user.id, pushToken });
//       await session.commitTransaction();
//     }

//     return successResponse(req, res, {
//       account: user,
//       token: accessToken,
//       refreshToken,
//       matrixAccessToken,
//     });
//   } catch (error) {
//     if (firebaseUid) {
//       await AuthService.deleteUser(firebaseUid);
//     }

//     if (stripeCustomer) {
//       await StripeService.deleteCustomer(stripeCustomer);
//     }

//     error = new Error(error?.response?.data?.error || error.message);

//     await session.abortTransaction();

//     return errorResponse(req, res, error);
//   } finally {
//     session.endSession();
//   }
// };

// export const login = async (req, res) => {
//   let matrixAccessToken;
//   try {
//     const { username, password, signature, payload, publicKeyBiometric, pushToken } = req.body;

//     let user = await User.findOne({ username });

//     if (!user) {
//       throw new Error('Incorrect Username or Password');
//     }

//     if (user.status == USER_STATUS.SUSPENDED || user.status == USER_STATUS.BLOCKED) {
//       throw new Error('You are not authorized to access on the platform, please contact Support.');
//     }

//     const {
//       user: { accessToken, refreshToken },
//     } = await AuthService.EmailLogin(user.email, password);

//     // Login on matrix

//     const matrixPassword = cryptr.decrypt(user.matrixPassword);

//     const { access_token } = await MatrixService.login(user.matrixUsername, matrixPassword);

//     matrixAccessToken = access_token;

//     let userData = user.toJSON(); // For set user

//     if (publicKeyBiometric) {
//       await user.update({ publicKeyBiometric });
//       userData.publicKeyBiometric = publicKeyBiometric;
//     }

//     const allowBiometricLogin =
//       signature && payload
//         ? AuthService.verifySignature(userData.publicKeyBiometric, payload, signature)
//         : false;

//     userData.allowBiometricLogin = allowBiometricLogin;

//     await user.updateOne({ _id: userData.id, pushToken });

//     return successResponse(req, res, {
//       account: userData,
//       token: accessToken,
//       refreshToken,
//       matrixAccessToken,
//     });
//   } catch (error) {
//     error = new Error(error?.response?.data?.error || error.message);

//     return errorResponse(req, res, error);
//   }
// };

// export const verifySignatureSettings = async (req, res) => {
//   try {
//     const { signature, payload } = req.body;
//     const { publicKeyBiometric } = req.user;

//     const signatureVerified = AuthService.verifySignature(publicKeyBiometric, payload, signature);
//     return successResponse(req, res, { signatureVerified });
//   } catch (error) {
//     const { message } = error;
//     return errorResponse(req, res, message);
//   }
// };

// export const verifyBiometricSignature = async (req, res) => {
//   try {
//     const { signature, payload, username } = req.body;

//     const user = await User.findOne({ username });

//     if (!user) {
//       throw new Error('Incorrect Username or Password');
//     }

//     const { publicKeyBiometric } = user;

//     const signatureVerified = publicKeyBiometric
//       ? AuthService.verifySignature(publicKeyBiometric, payload, signature)
//       : false;

//     return successResponse(req, res, { signatureVerified });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

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

// export const sendSmsCodeVerification = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { newPhoneNumber } = req.body;
//     const { id, phoneNumber } = req.user;

//     if (!phoneNumber) {
//       return errorResponse(req, res, 400, {
//         message: 'Phone number was not saved.',
//       });
//     }

//     const smsToken = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

//     const now = new Date();
//     let smsTokenExpiration = now;
//     smsTokenExpiration.setMinutes(now.getMinutes() + 2);

//     const payload = { smsTokenExpiration, smsToken };

//     if (newPhoneNumber) {
//       payload.phoneNumber = newPhoneNumber;
//       payload.smsVerificated = false;
//     }

//     await User.updateOne({ _id: id }, payload, { session, new: true });

//     await TwilioService.sendSms(
//       `Myside Account Verification Code: ${smsToken}`,
//       newPhoneNumber || phoneNumber,
//     );

//     await session.commitTransaction();

//     return successResponse(req, res, { success: true });
//   } catch (error) {
//     await session.abortTransaction();
//     return errorResponse(req, res, error);
//   } finally {
//     session.endSession();
//   }
// };

// export const verifySmsCode = async (req, res) => {
//   try {
//     const { code } = req.body;
//     const { smsToken, smsTokenExpiration, id } = req.user;

//     if (new Date(smsTokenExpiration).getTime() < new Date().getTime()) {
//       return errorResponse(req, res, new Error('Expired code'), 400);
//     }

//     if (code != smsToken) {
//       return errorResponse(req, res, new Error('Invalid code'), 400);
//     }

//     await User.updateOne(
//       { _id: id },
//       {
//         smsToken: null,
//         smsTokenExpiration: null,
//       },
//     );

//     return successResponse(req, res, { success: true });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     const { id } = req.user;
//     await User.updateOne({ _id: id }, { pushToken: null });

//     return successResponse(req, res, {});
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const refreshToken = async (req, res) => {
//   try {
//     const { token: refresh_token } = req.body;
//     const { data } = await axios.post(
//       `https://securetoken.googleapis.com/v1/token?key=${config.firebaseApiKey}`,
//       {
//         grant_type: 'refresh_token',
//         refresh_token,
//       },
//     );

//     return successResponse(req, res, {
//       token: data.access_token,
//       refreshToken: data.refresh_token,
//     });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

// export const getMe = async (req, res) => {
//   const { friendsCount, postsCount } = req.user;

//   return successResponse(req, res, { friendsCount, postsCount });
// };
