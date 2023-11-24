import { TUser } from './userInterface';
import UserModel from './userModel';

const createOneUserInDB = async (user: TUser) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User Already Existed');
  }
  const insertedUser = await UserModel.create(user);

  return insertedUser;
};

const getAllUserFromDB = async () => {
  const allUsers = await UserModel.find({},{ password: 0,isDeleted:0 });

  return allUsers;
};

const getOneUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }
  const getOneUser = await UserModel.findOne({ userId },{ password: 0,isDeleted:0 });

  return getOneUser;
};

const deleteOneUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }
  const upDatedUser=await UserModel.updateOne({ userId }, { isDeleted: true });
  return upDatedUser;
};

export const UseService = {
  createOneUserInDB,
  getAllUserFromDB,
  getOneUserFromDB,
  deleteOneUserFromDB,
};
