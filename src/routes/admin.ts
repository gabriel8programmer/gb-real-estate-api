import { Router } from "express";
import usersRouter from "./users";
import { ONLY_ADMINS } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

// users routes
router.use("/users", Auth.verifyToken, ONLY_ADMINS, usersRouter);
// rentals
router.delete("/rentals/:id", Auth.verifyToken, ONLY_ADMINS);

export default router;
