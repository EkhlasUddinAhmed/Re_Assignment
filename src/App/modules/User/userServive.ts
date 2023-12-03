import { TOrder, TUser } from './userInterface';
import UserModel from './userModel';
import UserSchemaForZod from './userValidation';

const createOneUserInDB = async (user: TUser) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error(`User Already Existed With this userId:${user.userId}`);
  }

  if (await UserModel.isUserExists2(user.username)) {
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
  });

  return allUsers;
};

const getOneUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }
  const getOneUser = await UserModel.findOne({ userId }).select({
    password: 0,
    isDeleted: 0,
    _id: 0,
  });

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

const UpdateOneUserFromDB = async (userId: number, user:Partial<TUser>) => {
 
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
  }

  const getOneUser = await UserModel.findOne({ userId }).select({
    
    isDeleted: 0,
    _id: 0,
  });
  console.log("Got User.....:",getOneUser)
   user.password=await getOneUser?.password
  console.log("Get User:",user)
  user.password=await getOneUser?.password;

  // user.password=await getOneUser.password;

  const zodValidatedUserForUpdate = await UserSchemaForZod.parse(user);
  const upDatedUser = await UserModel.findOneAndUpdate(
    { userId },
    { $set: zodValidatedUserForUpdate },

    { new: true, useFindAndModify: false },
  ).select({
    // userId:0,
    // username:0,
    password: 0,
    isDeleted: 0,
    _id: 0,
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
      $match: { userId },
    },
    {
      $project: {
        orders: 1,
        _id: 0,
      },
    },
  ]);
  return newOrder;
};

const TotalPrice = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Existed..');
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

// import mongoose, { Document, Model, Schema } from 'mongoose';

// // Define the User schema
// interface User {
//   name: string;
//   password: string;
//   job: string;
// }

// const userSchema = new Schema<User>({
//   name: { type: String, required: true },
//   password: { type: String, required: true },
//   job: { type: String, required: true }
// });

// // Create the User model
// const UserModel: Model<Document & User> = mongoose.model('User', userSchema);

// // Function to update user excluding password
// async function updateUser(userId: string, updatedData: Partial<User>): Promise<Document & User | null> {
//   try {
//     // Find the user by ID
//     const user = await UserModel.findById(userId);

//     if (user) {
//       // Update fields except for the password
//       user.name = updatedData.name || user.name;
//       user.job = updatedData.job || user.job;

//       // Save the updated user
//       const updatedUser = await user.save();
//       return updatedUser;
//     }
//     return null;
//   } catch (error) {
//     // Handle error
//     console.error(error);
//     return null;
//   }
// }

// // Usage example
// const userId = 'your_user_id'; // Replace with the actual user ID
// const updatedData = {
//   name: 'UpdatedName',
//   job: 'UpdatedJob'
// };

// updateUser(userId, updatedData)
//   .then(updatedUser => {
//     if (updatedUser) {
//       console.log('Updated User:', updatedUser);
//     } else {
//       console.log('User not found.');
//     }
//   })
//   .catch(error => {
//     console.error('Error updating user:', error);
//   });
