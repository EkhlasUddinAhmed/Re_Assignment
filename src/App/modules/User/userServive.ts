import { TProduct, TUser } from './userInterface';
import UserModel from './userModel';
import UserSchemaForZod, {ProductSchemaValidation } from './userValidation';

const createOneUserInDB = async (user: TUser) => {
  const userIdExisted = await UserModel.isUserExists1(user.userId);

  if (userIdExisted) {
    throw new Error(`User Already Existed With this userId:${user.userId}`);
  }

  const usernameExisted = await UserModel.isUserExists2(user.username);

  if (usernameExisted) {
    throw new Error(`User Already Existed With this userName:${user.username}`);
  }

  const insertedUser = await UserModel.create(user);

  return insertedUser;
};

const getAllUserFromDB = async () => {
  const allUsers = await UserModel.find({}).select({
    password: 0,
    isDeleted: 0,
    _id: 0,
    'fullName._id': 0,
    __v: 0,
    orders:0,
    userId:0,
    isActive:0,
    hobbies:0
  });

  return allUsers;
};

const getOneUserFromDB = async (userId: number) => {
  const isUserExisted = await UserModel.isUserExists1(userId);

  if (!isUserExisted) {
    throw new Error('User Not Found..');
  }
  const getOneUser = await UserModel.findOne({ userId }).select({
    password: 0,
    isDeleted: 0,
    _id: 0,
    'fullName._id': 0,
    __v: 0,
    orders: 0,
  });

  return getOneUser;
};

const deleteOneUserFromDB = async (userId: number) => {
  const isUserExisted = await UserModel.isUserExists1(userId);

  if (!isUserExisted) {
    throw new Error('User Not Found..');
  }
  const upDatedUser = await UserModel.updateOne(
    { userId },
    { isDeleted: true },
  );
  return upDatedUser;
};

const UpdateOneUserFromDB = async (userId: number, user: TUser) => {
  const userIdExisted = await UserModel.isUserExists1(userId);
  

  if (!userIdExisted) {
    throw new Error('User Not Found to Update..!!');
  }

  user.password = await userIdExisted.password;
  
  const zodValidatedUserForUpdate = await UserSchemaForZod.parse(user);
  zodValidatedUserForUpdate.orders=await userIdExisted.orders;
  const upDatedUser = await UserModel.findOneAndUpdate(
    { userId },
    { $set: zodValidatedUserForUpdate },

    { new: true, useFindAndModify: false },
  ).select({
    password: 0,
    isDeleted: 0,
    _id: 0,
    'fullName._id': 0,
    orders: 0,
    __v: 0,
  });
  return upDatedUser;
};

const UserOrder = async (userId: number, order: TProduct) => {
  const isUserExisted = await UserModel.isUserExists1(userId);
  if (!isUserExisted) {
    throw new Error('User Not Existed..');
  }
  const ZodvalidatedProduct = await ProductSchemaValidation.parse(order);

  const newOrder = await UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: ZodvalidatedProduct,
      },
    },
  );
  return newOrder;
};

const GetUserOrders = async (userId: number) => {
  const isUserExisted = await UserModel.isUserExists1(userId);
  if (!isUserExisted) {
    throw new Error('User Not Found..');
  }

  const newOrder = await UserModel.aggregate([
    {
      $match: { userId },
    },

    {
      $project: {
        orders: 1,
        _id: 0,
      },
    },
  ]);

  const omittingIDFromOrder = newOrder[0].orders.map((order: TProduct) => ({
    productName: order.productName,
    price: order.price,
    quantity: order.quantity,
  }));

  
  return omittingIDFromOrder;
};

const TotalPrice = async (userId: number) => {
  const isUserExists = await UserModel.isUserExists1(userId);
  if (!isUserExists) {
    throw new Error('User Not Found..!!');
  }

  const total = await UserModel.aggregate([
    {
      $match: { userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        TPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },

    {
      $project: {
        TotalPrice: { $round: ['$TPrice', 2] },
        _id: 0,
      },
    },
  ]);
  return total;
};

export const UseService = {
  createOneUserInDB,
  getAllUserFromDB,
  getOneUserFromDB,
  deleteOneUserFromDB,
  UpdateOneUserFromDB,
  UserOrder,
  GetUserOrders,
  TotalPrice,
};
