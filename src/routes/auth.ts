import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { PrismaUsersRepository } from "../repositories/prisma/PrismaUsersRepository";

const router = Router();

// repository
const authRepository = new PrismaUsersRepository();

// service
const authService = new AuthService(authRepository);

// controller
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/social");
router.post("/forgot-password");

export default router;
