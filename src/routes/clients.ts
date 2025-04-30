import { Router } from "express";
import { clientsController, ONLY_AGENTS_CLIENTS, ONLY_CLIENTS } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/:id", Auth.verifyToken, ONLY_AGENTS_CLIENTS, clientsController.show);
router.post("/", Auth.verifyToken, ONLY_CLIENTS, clientsController.save);
router.put("/:id", Auth.verifyToken, ONLY_CLIENTS, clientsController.update);
router.delete("/:id", Auth.verifyToken, ONLY_CLIENTS, clientsController.delete);

export default router;
