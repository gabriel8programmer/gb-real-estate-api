import { Router } from "express";
import { PropertiesController } from "../controllers/PropertiesController";
import { Properties } from "../models/Properties";

const router = Router();

// model
const propertiesModel = new Properties();
// controller
const propertiesController = new PropertiesController(propertiesModel);

router.get("/properties", propertiesController.index);
router.get("/properties/:id", propertiesController.show);
// admin's or agent's properties
router.post("/admin/properties", propertiesController.save);
router.put("/admin/properties/:id", propertiesController.update);
router.delete("/admin/properties/:id", propertiesController.delete);
router.post("/admin/properties/:propertyId/images", propertiesController.addImages);
router.post("/admin/properties/:propertyId/images/batch-remove", propertiesController.removeImages);
router.put("/admin/properties/:propertyId/location", propertiesController.updateLocation);

export default router;
