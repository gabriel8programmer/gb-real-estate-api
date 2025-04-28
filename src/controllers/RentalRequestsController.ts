import { Handler } from "express";
import { RentalRequestServices } from "../services/rentalRequestServices";

export class RentalRequestsController {
  constructor(private readonly rentalRequestServices: RentalRequestServices) {}

  index: Handler = async (req, res, next) => {
    try {
      const rentalRequests = await this.rentalRequestServices.getRentalRequests();
      res.json(rentalRequests);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
