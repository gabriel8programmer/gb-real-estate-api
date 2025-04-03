import { Router } from "express";
import { PropertyTypesController } from "../controllers/PropertyTypesController";
import { PropertyTypes } from "../models/PropertyType";

const router = Router();

// model
const typeModel = new PropertyTypes();
// controller
const typeController = new PropertyTypesController(typeModel);

router.get("/property-types", typeController.index);
router.post("/property-types", typeController.save);
router.patch("/property-types/:id", typeController.update);
router.delete("/property-types/:id", typeController.delete);

export default router;
