import { AuthController } from "../controllers/AuthController";
import { AuthServices } from "../services/AuthServices";
import { usersModel } from "./users";

export const authServices = new AuthServices(usersModel);
export const authController = new AuthController(authServices);
