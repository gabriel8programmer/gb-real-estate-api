import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { Users } from "../models/Users";

const router = Router();

// user's model
const usersModel = new Users();

const usersController = new UsersController(usersModel);

router.get("/users", usersController.index);
router.get("/users/:id", usersController.show);
router.post("/users", usersController.save);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

export default router;
