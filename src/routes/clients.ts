import { Router } from "express";
import { clientsController } from "../container";

const router = Router();

router.get("/:id", clientsController.show);
router.post("/", clientsController.save);
router.put("/:id", clientsController.update);
router.delete("/:id", clientsController.delete);

export default router;
