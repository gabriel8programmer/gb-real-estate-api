import { Router } from "express";
import { propertiesController } from "./container";

const router = Router();

router.get("/properties", propertiesController.index);
router.get("/properties/:id", propertiesController.show);
// admin's or agent's properties
router.post("/admin/properties", propertiesController.save);
router.put("/admin/properties/:id", propertiesController.update);
router.delete("/admin/properties/:id", propertiesController.delete);
router.post("/admin/properties/:propertyId/images", propertiesController.addImages);
router.delete("/admin/properties/:propertyId/images/:imageId", propertiesController.removeImages);

export default router;
