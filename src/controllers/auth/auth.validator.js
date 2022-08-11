const Joi = require('joi');

export const register = {
  body: {
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};

export const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

export const logout = {
  body: {},
};

export const verifyBiometricSignature = {
  body: {
    body: {
      username: Joi.string().required(),
      signature: Joi.string().required(),
      payload: Joi.string().required(),
    },
  },
};

export const verifySignatureSettings = {
  body: {
    signature: Joi.string().required(),
    payload: Joi.string().required(),
  },
};

export const recoverPassword = {
  body: {
    email: Joi.string().email().required(),
  },
};

export const resetPassword = {
  body: {
    token: Joi.string().required(),
    password: Joi.string().required(),
  },
};

export const changePassword = {
  body: {
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

export const verifySmsCode = {
  body: {
    code: Joi.string().required(),
  },
};

export const refreshToken = {
  body: {
    token: Joi.string().required(),
  },
};
