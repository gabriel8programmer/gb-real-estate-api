import { ClientsController } from "../controllers/ClientsController";
import { Clients } from "../models/Clients";
import { ClientServices } from "../services/ClientServices";
import { usersModel } from "./users";

export const clientModel = new Clients();
export const clientServices = new ClientServices(usersModel, clientModel);
export const clientsController = new ClientsController(clientServices);
