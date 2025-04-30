import { Router } from "express";
import { ONLY_ADMINS_AGENTS, propertiesController } from "../container";
import { AuthMiddlewares as Auth } from "../middlewares/AuthMiddlewares";

const router = Router();

// allow access with out authentication
router.get("/", propertiesController.index);
router.get("/:id", propertiesController.show);

router.post("/", Auth.verifyToken, ONLY_ADMINS_AGENTS, propertiesController.save);
router.put("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS, propertiesController.update);
router.delete("/:id", Auth.verifyToken, ONLY_ADMINS_AGENTS, propertiesController.delete);
router.post(
  "/:propertyId/images",
  Auth.verifyToken,
  ONLY_ADMINS_AGENTS,
  propertiesController.addImages
);
router.delete(
  "/:propertyId/images/:imageId",
  Auth.verifyToken,
  ONLY_ADMINS_AGENTS,
  propertiesController.removeImages
);

export default router;
