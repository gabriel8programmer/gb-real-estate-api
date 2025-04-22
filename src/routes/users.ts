import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { Users } from "../models/Users";
import { UserServices } from "../services/UserServices";

const router = Router();

// user's model
const usersModel = new Users();
// user's services
const userService = new UserServices(usersModel);
// user's controller
const usersController = new UsersController(userService);

router.get("/users", usersController.index);
// router.get("/users/:id", usersController.show);
// router.post("/users", usersController.save);
// router.put("/users/:id", usersController.update);
// router.delete("/users/:id", usersController.delete);

export default router;
