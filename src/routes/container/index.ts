import { UsersController } from "../../controllers/UsersController";
import { Users } from "../../models/Users";
import { UserServices } from "../../services/UserServices";

import { ClientsController } from "../../controllers/ClientsController";
import { Clients } from "../../models/Clients";
import { ClientServices } from "../../services/ClientServices";

import { PropertiesController } from "../../controllers/PropertiesController";
import { Properties } from "../../models/Properties";
import { PropertyServices } from "../../services/PropertyServices";

import { PropertyTypesController } from "../../controllers/PropertyTypesController";
import { PropertyTypes } from "../../models/PropertyType";

import { AuthController } from "../../controllers/AuthController";
import { AuthServices } from "../../services/AuthServices";

// user's model
export const usersModel = new Users();
// user's services
export const userServices = new UserServices(usersModel);
// user's controller
export const usersController = new UsersController(userServices);

// client's model
export const clientModel = new Clients();
// client's services
export const clientServices = new ClientServices(usersModel, clientModel);
// client's controller
export const clientsController = new ClientsController(clientServices);

// property type model
export const typeModel = new PropertyTypes();
// property type controller
export const typeController = new PropertyTypesController(typeModel);

// property's model
export const propertiesModel = new Properties();
// property's services
export const propertyServices = new PropertyServices(propertiesModel);
// property's controller
export const propertiesController = new PropertiesController(propertyServices);

// auth's services
export const authServices = new AuthServices(userServices);
// auth's controller
export const authController = new AuthController(authServices);
