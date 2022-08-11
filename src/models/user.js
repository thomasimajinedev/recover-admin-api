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
    picture: {
      type: String,
    },
    cover: {
      type: String,
    },
    name: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    phoneNumber: {
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
