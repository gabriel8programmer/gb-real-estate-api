import { Router } from "express";
import { authController } from "./container";
import { AuthMiddleware as Auth } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// social autenticators
router.post("/signin/google", Auth.google, authController.google); // google authentication

export default router;
