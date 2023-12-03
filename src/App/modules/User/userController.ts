import { Request, Response } from 'express';

import { UseService } from './userServive';
import UserSchemaForZod from './userValidation';
import { TOrder, TUser } from './userInterface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodValidatedUser = await UserSchemaForZod.parse(user);
    const result = await UseService.createOneUserInDB(zodValidatedUser);
    // const { password, isDeleted, ...newObject } = result;

    const newRefinedUser = {
      userId: result.userId,
      username: result.username,
      fullName: {
        firstName: result.fullName.firstName,
        lastName: result.fullName.lastName,
      },
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: {
        street: result.address.street,
        city: result.address.city,
        country: result.address.country,
      },
    };

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: newRefinedUser,
    });
  } catch (error: any) {
    res.status(404).send({
      success: false,
      message: 'User not Created',
      error: {
        code: 404,
        description: error.message || 'Creating User Failed',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UseService.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Fetching All Users Successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Fetching All Users Failed ',
    });
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.getOneUserFromDB(uid);

    res.status(200).json({
      success: true,
      message: 'One User fetch Successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User Not Found ',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.deleteOneUserFromDB(uid);

    res.status(200).json({
      success: true,
      message: 'Deleted Student Successfully',
      user: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User Not Found ',
      error: {
        code: 404,
        description: error.message || 'Something Wrong!',
      },
    });
  }
};

const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user: TUser = req.body;
    const uid = parseInt(userId);

    


    const result = await UseService.UpdateOneUserFromDB(uid, user);

    res.status(200).json({
      success: true,
      message: ' User Updated  Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User Not Found to update ',
      error: {
        code: 404,
        description: error.message || 'Something Wrong!',
      },
    });
  }
};

const UserGivesOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order: TOrder = req.body;

    const uid = parseInt(userId);
    const result = await UseService.UserOrder(uid, order);

    
    res.status(200).json({
      success: true,
      message: 'Order Created Successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Order Failed...!! ',
      error: {
        code: 404,
        description: error.message || 'Something Wrong!',
      },
    });
  }
};

const UserAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.GetUserOrders(uid);

    if(result[0].orders.length===0){
      throw new Error("This User Has not given any order Yet ....")
    }

    res.status(200).json({
      success: true,
      message: 'All Orders fetched Successfully',
      data: result[0].orders,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Order Not Found ..Failed...!! ',
      error: {
        code: 404,
        description: error.message || 'Something Wrong!',
      },
    });
  }
};
const CalculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.TotalPrice(uid);

    // if(result.length===0){
    //   throw new Error("This User has not given any Order Yet!!");
    // }
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Total Price Calculated Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Total Price Calculation failed ..Failed...!! ',
      error: {
        code: 404,
        description: error.message || 'Something Wrong!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  UpdateUser,
  UserGivesOrder,
  UserAllOrder,
  CalculateTotalPrice,
};
