import express from 'express';
import validate from 'express-validation';
import * as authController from '../controllers/auth/auth.controller';
import * as authValidator from '../controllers/auth/auth.validator';

import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/me', authMiddleware, authController.getMe);

router.post('/sign-up', validate(authValidator.register), authController.register);

router.post('/sign-in', validate(authValidator.login), authController.login);

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

module.exports = router;
