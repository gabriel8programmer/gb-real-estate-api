import { Router } from "express";
import { ONLY_ADMINS_AGENTS, rentalRequestsController } from "../container";
import { AuthMiddlewares } from "../middlewares/AuthMiddlewares";

const router = Router();

router.get("/:id", AuthMiddlewares.verifyToken, rentalRequestsController.show);
router.delete("/:id", AuthMiddlewares.verifyToken, rentalRequestsController.delete);

router.get("/", AuthMiddlewares.verifyToken, ONLY_ADMINS_AGENTS, rentalRequestsController.index);
router.post("/", AuthMiddlewares.verifyToken, ONLY_ADMINS_AGENTS, rentalRequestsController.save);
router.put(
  "/:id",
  AuthMiddlewares.verifyToken,
  ONLY_ADMINS_AGENTS,
  rentalRequestsController.update
);

export default router;
