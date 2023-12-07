import express from 'express';
import { UserController } from './userController';
const UserRouter = express.Router();

UserRouter.post('/', UserController.createUser);
UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:userId', UserController.getOneUser);
UserRouter.delete('/:userId', UserController.deleteUser);
UserRouter.put('/:userId', UserController.UpdateUser);
UserRouter.put('/:userId/orders', UserController.UserGivesOrder);
UserRouter.get('/:userId/orders', UserController.UserAllOrder);
UserRouter.get(
  '/:userId/orders/total-price',
  UserController.CalculateTotalPrice,
);

export default UserRouter;
