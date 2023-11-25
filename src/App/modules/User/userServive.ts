import { TOrder, TUser } from './userInterface';
import UserModel from './userModel';

const createOneUserInDB = async (user: TUser) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User Already Existed');
  }
  const insertedUser = await UserModel.create(user);

  return insertedUser;
};

const getAllUserFromDB = async () => {
  const allUsers = await UserModel.find({}, { password: 0, isDeleted: 0 });

  return allUsers;
};

const getOneUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }
  const getOneUser = await UserModel.findOne(
    { userId },
    { password: 0, isDeleted: 0 },
  );

  return getOneUser;
};

const deleteOneUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }
  const upDatedUser = await UserModel.updateOne(
    { userId },
    { isDeleted: true },
  );
  return upDatedUser;
};

const UpdateOneUserFromDB = async (userId: number, user: TUser) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }

  const upDatedUser = await UserModel.findOneAndUpdate(
    { userId },
    { $set: user },
    { new: true, useFindAndModify: false },
  ).select({
    // userId:0,
    // username:0,
    password: 0,
    isDeleted: 0,
  });
  return upDatedUser;
};

const UserOrder = async (userId: number, order: TOrder) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }

  const newOrder = await UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: order,
      },
    },
  );
  return newOrder;
};

const GetUserOrders = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }

  const newOrder = await UserModel.aggregate([
       {
        $match:{userId}
       },
       {
        $project:{
          orders:1,
          _id:0
        }
       }
  ])
  return newOrder;
};



const TotalPrice = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }

  const total = await UserModel.aggregate([
       {
        $match:{userId}
       },
       {
        $unwind:"$orders"
       },
        {
          $group:{
            _id:null,
            TotalPrice:{
              $sum:{
                $multiply: [ "$orders.Price" ,"$orders.Quantity" ]
              }
             } 
          
          }
        },
       
       {
         $project:{
          TotalPrice:1,
          _id:0
       }}
      ])
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
  TotalPrice
};
