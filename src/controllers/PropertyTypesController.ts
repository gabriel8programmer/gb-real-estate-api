import { Handler } from "express";
import { PropertyTypes } from "../models/PropertyType";
import { z } from "zod";
import { HttpError } from "../errors/HttpError";

export class PropertyTypesController {
  constructor(private readonly propertyTypesModel: PropertyTypes) {}

  index: Handler = async (req, res, next) => {
    try {
      const types = await this.propertyTypesModel.find();
      res.json(types);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = z.object({ name: z.string() }).parse(req.body);
      const newType = await this.propertyTypesModel.create(body);
      res.status(201).json({ newType });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { name } = z.object({ name: z.string() }).parse(req.body);
      const udpatedType = await this.propertyTypesModel.updateNameById(id, name);
      if (!udpatedType) throw new HttpError(404, "Property type not found!");
      res.json({ udpatedType });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedType = await this.propertyTypesModel.deleteById(id);
      if (!deletedType) throw new HttpError(404, "Property type not found!");
      res.json({ deletedType });
    } catch (error) {
      next(error);
    }
  };
}
