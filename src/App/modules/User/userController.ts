/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { UseService } from './userServive';

import {TProduct, TUser } from './userInterface';
import UserSchemaValidation from './userValidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodValidatedUser = await UserSchemaValidation.parse(user);
    const result = await UseService.createOneUserInDB(zodValidatedUser);

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
      message:
        'User not Created due to same userId or same user name or other error',
      error: {
        code: 404,
        description: error || 'Creating User Failed',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UseService.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Fetching All Users Failed ',
      error: {
        code: 404,
        description: error || 'Something Wrong',
      },
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
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User Not Found ',
      error: {
        code: 404,
        description: error || 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
     await UseService.deleteOneUserFromDB(uid);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User Not Found ',
      error: {
        code: 404,
        description: error || 'Something Wrong!',
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
      message: 'User not Found or Other Error Occours..!! Update Failed...!! ',
      error: {
        code: 404,
        description: error || 'Something Wrong!',
      },
    });
  }
};

const UserGivesOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order: TProduct = req.body;

    const uid = parseInt(userId);
    await UseService.UserOrder(uid, order);

    res.status(200).json({
      success: true,
      message: 'Order Created Successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User Not Found or Something Wrong!!  Order Failed ...!! ',
      error: {
        code: 404,
        description: error || 'Something Wrong!',
      },
    });
  }
};

const UserAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.GetUserOrders(uid);
    

    if (result.length === 0) {
      throw new Error('This User Has not given any order Yet ....');
    }

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: result,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User Not Found or Other Error Occoured!! ',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};
const CalculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const uid = parseInt(userId);
    const result = await UseService.TotalPrice(uid);

    if (result.length === 0) {
      throw new Error('This User has not given any Order Yet!!');
    }

    res.status(200).json({
      success: true,
      message: 'Total Price Calculated Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Total Price Calculation failed !! ',
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
