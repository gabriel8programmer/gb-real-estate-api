import { PropertyTypesController } from "../controllers/PropertyTypesController";
import { PropertyTypes } from "../models/PropertyType";

export const typeModel = new PropertyTypes();
export const typeController = new PropertyTypesController(typeModel);
