import { Router } from "express";
import { rentalRequestsController } from "../container";

const router = Router();

router.get("/rental-requests", rentalRequestsController.index);
router.get("/rental-requests/:id", rentalRequestsController.show);
router.post("/rental-requests", rentalRequestsController.save);
router.put("/rental-requests/:id", rentalRequestsController.update);
router.delete("/rental-requests/:id", rentalRequestsController.delete);

export default router;
