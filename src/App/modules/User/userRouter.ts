import express from "express";
import { UserController } from "./userController";
const UserRouter=express.Router();

UserRouter.post("/",UserController.createUser);
UserRouter.get("/",UserController.getAllUsers);
UserRouter.get("/:userId",UserController.getOneUser);
UserRouter.delete("/:userId",UserController.deleteUser);


export default UserRouter;