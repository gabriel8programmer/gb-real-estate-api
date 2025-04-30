import { AuthController } from "../controllers/AuthController";
import { AuthServices } from "../services/AuthServices";
import { usersModel } from "./users";

import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

// AUTHORIZATIONS
export const ONLY_ADMINS = Auth.authorize("ADMIN");
export const ONLY_AGENTS = Auth.authorize("AGENT");
export const ONLY_CLIENTS = Auth.authorize("CLIENT");
export const ONLY_AGENTS_CLIENTS = Auth.authorize("AGENT", "CLIENT");
export const ONLY_ADMINS_AGENTS = Auth.authorize("ADMIN", "AGENT");

export const authServices = new AuthServices(usersModel);
export const authController = new AuthController(authServices);
