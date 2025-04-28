import { Router } from "express";
import { typeController } from "../container";

const router = Router();

router.get("/property-types", typeController.index);
router.post("/property-types", typeController.save);
router.patch("/property-types/:id", typeController.update);
router.delete("/property-types/:id", typeController.delete);

export default router;
