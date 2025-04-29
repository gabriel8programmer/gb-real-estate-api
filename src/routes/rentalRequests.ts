import { Router } from "express";
import { rentalRequestsController } from "../container";

const router = Router();

router.get("/", rentalRequestsController.index);
router.get("/:id", rentalRequestsController.show);
router.post("/", rentalRequestsController.save);
router.put("/:id", rentalRequestsController.update);
router.delete("/:id", rentalRequestsController.delete);

export default router;
