import mongoose from 'mongoose';
import { USER_STATUS, USER_GENDER, PROVIDERS, UNLOCKMETHODS } from '../constants';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    genderIdentity: {
      type: String,
    },
    genderBiological: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    apartment: {
      type: String,
    },
    zipcode: {
      type: String,
    },

    recoveryEmail: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.index({ name: 'text' });

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model('User', UserSchema);
