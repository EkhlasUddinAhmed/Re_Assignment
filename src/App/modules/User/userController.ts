import { Request, Response } from 'express';

import { UseService } from './userServive';
import UserSchemaForZod from './userValidation';
import { TUser } from './userInterface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodValidatedUser = await UserSchemaForZod.parse(user)
    const result = await UseService.createOneUserInDB(zodValidatedUser);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      user: result,
    });
  } catch (error:any) {
    res.status(404).send({
      success: false,
      message: 'User not Created',
      error: {
        code: 404,
        description: error.message ||'Creating User Failed',
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
    const { userId} = req.params;
    const uid=parseInt(userId);
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
        description:'User not found!',
      },
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId} = req.params;
    const uid=parseInt(userId);
    const result = await UseService.deleteOneUserFromDB(uid);

    
    res.status(200).json({
      success: true,
      message: 'Deleted Student Successfully',
      user: result,
    });
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: 'User Not Found ',
      error: {
        code: 404,
        description:error.message||'Something Wrong!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser
};
