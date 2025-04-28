import { UsersController } from "../controllers/UsersController";
import { Users } from "../models/Users";
import { UserServices } from "../services/UserServices";

export const usersModel = new Users();
export const userServices = new UserServices(usersModel);
export const usersController = new UsersController(userServices);
