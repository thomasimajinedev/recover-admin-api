// import express from 'express';
// import validate from 'express-validation';
// import * as authController from '../controllers/app/auth/auth.controller';
// import * as authValidator from '../controllers/app/auth/auth.validator';

// import authMiddleware from '../middleware/auth';

// const router = express.Router();

// router.get('/me', authMiddleware, authController.getMe);

// router.post('/sign-up', validate(authValidator.register), authController.register);

// router.post('/registered', validate(authValidator.registered), authController.registered);

// router.post(
//   '/sign-in-with-apple',
//   validate(authValidator.loginWithApple),
//   authController.loginWithApple,
// );

// router.post(
//   '/sign-in-with-google',
//   validate(authValidator.loginWithGoogle),
//   authController.loginWithGoogle,
// );

// router.put('/logout', authMiddleware, validate(authValidator.logout), authController.logout);

// router.post('/sign-in', validate(authValidator.login), authController.login);

// router.post(
//   '/verify-biometric-signature',
//   validate(authValidator.verifyBiometricSignature),
//   authController.verifyBiometricSignature,
// );

// router.post(
//   '/verify-biometric-signature-settings',
//   authMiddleware,
//   validate(authValidator.verifySignatureSettings),
//   authController.verifySignatureSettings,
// );

// router.post(
//   '/recover-password',
//   validate(authValidator.recoverPassword),
//   authController.recoverPassword,
// );

// router.post('/reset-password', validate(authValidator.resetPassword), authController.resetPassword);

// router.put(
//   '/change-password',
//   authMiddleware,
//   validate(authValidator.changePassword),
//   authController.changePassword,
// );

// router.post('/send-sms-code-verification', authMiddleware, authController.sendSmsCodeVerification);
// router.post(
//   '/verify-sms-code',
//   authMiddleware,
//   validate(authValidator.verifySmsCode),
//   authController.verifySmsCode,
// );

// router.post('/refreshToken', validate(authValidator.refreshToken), authController.refreshToken);

// module.exports = router;
