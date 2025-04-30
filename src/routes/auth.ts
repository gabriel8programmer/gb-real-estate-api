import { Router } from "express";
import { AuthMiddleware as OAuth } from "../middlewares/OAuthMiddlewares";
import { authController } from "../container";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-email-verification", authController.sendMail);
router.get("/verify-email/:token", authController.verifyEmail);
// social autenticators
router.post("/signin/google", OAuth.google, authController.social);

export default router;
