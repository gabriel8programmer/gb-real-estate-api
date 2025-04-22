import { Router } from "express";
import { usersController } from "./container";

const router = Router();

router.get("/users", usersController.index);
router.get("/users/:id", usersController.show);
router.post("/users", usersController.save);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

export default router;
