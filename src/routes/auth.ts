import { Router } from "express";
import { authController } from "./container";
import { AuthMiddleware as Auth } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// verification email routes
router.post("/send-email-verification", authController.sendMail);
router.get("/verify-email/:token", authController.verifyEmail);
// social autenticators
router.post("/signin/google", Auth.google, authController.social); // google authentication

export default router;
