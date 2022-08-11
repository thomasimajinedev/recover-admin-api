const Joi = require('joi');

export const register = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    publicKeyBiometric: Joi.string().allow('', null),
    pushToken: Joi.string().required().allow('', null),
  },
};

export const registered = {
  body: {
    provider: Joi.string().required(),
    providerId: Joi.string().required(),
  },
};

export const loginWithApple = {
  body: {
    token: Joi.string().required(),
    nonce: Joi.string().required(),
    username: Joi.string().allow('', null),
    phoneNumber: Joi.string().allow('', null),
    providerId: Joi.string().allow('', null),
    pushToken: Joi.string().allow('', null),
  },
};

export const loginWithGoogle = {
  body: {
    token: Joi.string().required(),
    username: Joi.string().allow('', null),
    phoneNumber: Joi.string().allow('', null),
    providerId: Joi.string().allow('', null),
    pushToken: Joi.string().allow('', null),
  },
};

export const login = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    signature: Joi.string().allow('', null),
    payload: Joi.string().allow('', null),
    publicKeyBiometric: Joi.string().allow('', null),
    pushToken: Joi.string().allow('', null),
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
