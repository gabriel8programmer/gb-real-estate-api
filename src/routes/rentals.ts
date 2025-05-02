import { Router } from "express";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";
import { ONLY_ADMINS_AGENTS } from "../container";

const router = Router();

router.get("/", Auth.verifyToken, ONLY_ADMINS_AGENTS);
router.get("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS);
router.post("/", Auth.verifyToken, ONLY_ADMINS_AGENTS);
router.put("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS);

export default router;
