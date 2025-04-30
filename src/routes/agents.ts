import { Router } from "express";
import { agentsController, ONLY_AGENTS } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/:id", Auth.verifyToken, ONLY_AGENTS, agentsController.show);
router.post("/", Auth.verifyToken, ONLY_AGENTS, agentsController.save);
router.put("/:id", Auth.verifyToken, ONLY_AGENTS, agentsController.update);
router.delete("/:id", Auth.verifyToken, ONLY_AGENTS, agentsController.delete);

export default router;
