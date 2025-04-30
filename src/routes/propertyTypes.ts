import { Router } from "express";
import { ONLY_ADMINS_AGENTS, typeController } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/", Auth.verifyToken, ONLY_ADMINS_AGENTS, typeController.index);
router.post("/", Auth.verifyToken, ONLY_ADMINS_AGENTS, typeController.save);
router.patch("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS, typeController.update);
router.delete("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS, typeController.delete);

export default router;
