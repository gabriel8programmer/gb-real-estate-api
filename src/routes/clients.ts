import { Router } from "express";
import { clientsController } from "../container";

const router = Router();

router.get("/clients/:id", clientsController.show);
router.post("/clients", clientsController.save);
router.put("/clients/:id", clientsController.update);
router.delete("/clients/:id", clientsController.delete);

export default router;
