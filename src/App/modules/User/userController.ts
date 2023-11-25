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
      user: newRefinedUser,
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
      message: 'Get All Users Successfully',
      users: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Getting All Users Failed ',
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
      message: 'One User Got Successfully',
      user: result,
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
      message: 'Updated User Successfully',
      user: result,
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
      message: 'Order Successfull',
      productOrdered: req.body,
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

    res.status(200).json({
      success: true,
      message: 'All Orders Get Successfully',
      productOrdered: result[0].orders,
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
  CalculateTotalPrice
};
