import { UsersController } from "../../controllers/UsersController";
import { Users } from "../../models/Users";
import { UserServices } from "../../services/UserServices";

import { ClientsController } from "../../controllers/ClientsController";
import { Clients } from "../../models/Clients";
import { ClientServices } from "../../services/ClientServices";

// user's model
export const usersModel = new Users();
// user's services
export const userService = new UserServices(usersModel);
// user's controller
export const usersController = new UsersController(userService);

// client's model
export const clientModel = new Clients();
// client's services
export const clientServices = new ClientServices(usersModel, clientModel);
// client's controller
export const clientsController = new ClientsController(clientServices);
