import express from "express";
import { UserController } from "./userController";
const UserRouter=express.Router();

UserRouter.post("/",UserController.createUser);
UserRouter.get("/",UserController.getAllUsers);
UserRouter.get("/:userId",UserController.getOneUser);
UserRouter.delete("/:userId",UserController.deleteUser);
UserRouter.put("/:userId",UserController.UpdateUser);
UserRouter.put("/:userId/orders",UserController.UserGivesOrder);
UserRouter.get("/:userId/orders",UserController.UserAllOrder);
UserRouter.get("/:userId/orders/total-price",UserController.CalculateTotalPrice);


export default UserRouter;



// {
//     "userId": 3,
//     "username": "Gias Uddin Ahmed",
//     "password": "Rafi",
//     "fullName": {
//       "firstName": "Rafi",
//       "lastName": "uddin Ahmed"
//     },
//     "age": 30,
//     "email": "ekhlas@express.com",
//     "isActive": false,
//     "hobbies": [ "Boat Riking","Shooting"],
//     "address": {
//       "street": "442222/100 R.K Mission Road",
//       "city": "Dhaka",
//       "country": "Bangladesh"
//     }
    
//   }


// ProductName: Bag,
// Price: 150,
// Quantity:3,