
import { Router } from "express"
import authController from "../controllers/auth-controller"
import userAuthValidatorMiddleware from "../middlewares/user-auth-validator-middleware"
import encryptPasswordMiddleware from "../middlewares/encrypt-password-middleware"
import jwtAuthMiddleware from "../middlewares/jwt-auth-middleware"

const router = Router()

router.post("/register", userAuthValidatorMiddleware, encryptPasswordMiddleware, jwtAuthMiddleware, authController.register)
router.post("/login", authController.login)

export default router