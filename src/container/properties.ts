import { PropertiesController } from "../controllers/PropertiesController";
import { Properties } from "../models/Properties";
import { PropertyServices } from "../services/PropertyServices";

export const propertiesModel = new Properties();
export const propertyServices = new PropertyServices(propertiesModel);
export const propertiesController = new PropertiesController(propertyServices);
