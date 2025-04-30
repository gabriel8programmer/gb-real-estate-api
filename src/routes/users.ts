import { Router } from "express";
import { usersController } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/", Auth.verifyToken, Auth.authorize("ADMIN"), usersController.index);
router.get("/:id", Auth.verifyToken, Auth.authorize("ADMIN"), usersController.show);
router.post("/", Auth.verifyToken, Auth.authorize("ADMIN"), usersController.save);
router.put("/:id", Auth.verifyToken, Auth.authorize("ADMIN"), usersController.update);
router.delete("/:id", Auth.verifyToken, Auth.authorize("ADMIN"), usersController.delete);

export default router;
