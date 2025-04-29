import { Router } from "express";
import { AuthMiddleware as OAuth } from "../middlewares/OAuthMiddlewares";
import { authController } from "../container";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// verification email routes
router.post("/send-email-verification", authController.sendMail);
// this route doesn't return json, only just html
router.get("/verify-email/:token", authController.verifyEmail);
// social autenticators
router.post("/signin/google", OAuth.google, authController.social); // google authentication

export default router;
