import { Router } from "express";
import { usersController } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/", Auth.verifyToken, usersController.index);
router.get("/:id", Auth.verifyToken, usersController.show);
router.post("/", Auth.verifyToken, usersController.save);
router.put("/:id", Auth.verifyToken, usersController.update);
router.delete("/:id", Auth.verifyToken, usersController.delete);

export default router;
