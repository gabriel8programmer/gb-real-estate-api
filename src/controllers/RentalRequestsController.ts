import { Handler } from "express";
import { RentalRequestServices } from "../services/RentalRequestServices";
import {
  CreateRentalRequestSchema,
  RentalRequestQueryParams,
  UpdateRentalRequestSchema,
} from "../types/schemas/RentalRequestsSchema";

export class RentalRequestsController {
  constructor(private readonly rentalRequestServices: RentalRequestServices) {}

  index: Handler = async (req, res, next) => {
    try {
      const query = RentalRequestQueryParams.parse(req.query);
      const data = await this.rentalRequestServices.getRentalRequestsPaginated(query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const data = await this.rentalRequestServices.getRentalRequestById(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreateRentalRequestSchema.parse(req.body);
      const data = await this.rentalRequestServices.createRentalRequest(body);
      res.status(201).json({ message: "Rental request created successfuly!", data });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateRentalRequestSchema.parse(req.body);
      const data = await this.rentalRequestServices.updateRentalRequestById(id, body);
      res.json({ message: "Rental request updated successfuly!", data });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const data = await this.rentalRequestServices.deleteRentalRequestById(id);
      res.json({ message: "Rental request deleted successfuly!", data });
    } catch (error) {
      next(error);
    }
  };
}
