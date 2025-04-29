import { Router } from "express";
import { typeController } from "../container";

const router = Router();

router.get("/", typeController.index);
router.post("/", typeController.save);
router.patch("/:id", typeController.update);
router.delete("/:id", typeController.delete);

export default router;
