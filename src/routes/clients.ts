import { Router } from "express";
import { ClientsController } from "../controllers/ClientsController";
import { Clients } from "../models/Clients";

const router = Router();

// client's model
const clientModel = new Clients();

// controller
const clientsController = new ClientsController(clientModel);

router.get("/clients/:id", clientsController.show);
router.post("/clients", clientsController.save);
router.put("/clients/:id", clientsController.update);
router.delete("/clients/:id", clientsController.delete);

export default router;
