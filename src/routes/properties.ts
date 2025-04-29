import { Router } from "express";
import { propertiesController } from "../container";

const router = Router();

router.get("/", propertiesController.index);
router.get("/:id", propertiesController.show);
router.post("/", propertiesController.save);
router.put("/:id", propertiesController.update);
router.delete("/:id", propertiesController.delete);
router.post("/:propertyId/images", propertiesController.addImages);
router.delete("/:propertyId/images/:imageId", propertiesController.removeImages);

export default router;
