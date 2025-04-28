import { RentalRequestsController } from "../controllers/RentalRequestsController";
import { RentalRequests } from "../models/RentalRequests";
import { RentalRequestServices } from "../services/RentalRequestServices";

export const rentalRequestsModel = new RentalRequests();
export const rentalRequestServices = new RentalRequestServices(rentalRequestsModel);
export const rentalRequestsController = new RentalRequestsController(rentalRequestServices);
