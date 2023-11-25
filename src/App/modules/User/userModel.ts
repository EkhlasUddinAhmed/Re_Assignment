import { Schema, model } from 'mongoose';
import { TOrder, TUser, UserStaticModel } from './userInterface';
import bcrypt from 'bcrypt';

import dotenvConfig from '../../dotenvConfig';

const OrderSchema = new Schema<TOrder>({
  ProductName: String,
  Price: Number,
  Quantity:Number,

});

const UserSchema = new Schema<TUser, UserStaticModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orders: [OrderSchema],
});

UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(dotenvConfig.BCRYPT_SALT_ROUND),
  );
  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
UserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
UserSchema.pre('findOne', function (next) {
  this.find({
    isDeleted: { $ne: true },
  });
  next();
});
UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

UserSchema.post('find', function (doc, next) {
  next();
});

const UserModel = model<TUser, UserStaticModel>('User', UserSchema);
export default UserModel;


