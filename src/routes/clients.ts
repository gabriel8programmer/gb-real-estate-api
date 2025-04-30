import { Router } from "express";
import { clientsController } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/:id", Auth.verifyToken, Auth.authorize("CLIENT"), clientsController.show);
router.post("/", Auth.verifyToken, Auth.authorize("CLIENT"), clientsController.save);
router.put("/:id", Auth.verifyToken, Auth.authorize("CLIENT"), clientsController.update);
router.delete("/:id", Auth.verifyToken, Auth.authorize("CLIENT"), clientsController.delete);

export default router;
