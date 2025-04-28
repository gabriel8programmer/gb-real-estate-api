import { AuthController } from "../controllers/AuthController";
import { AuthServices } from "../services/AuthServices";
import { userServices } from "./users";

export const authServices = new AuthServices(userServices);
export const authController = new AuthController(authServices);
