import { Handler } from "express";
import { Properties } from "../models/Properties";
import { HttpError } from "../errors/HttpError";
import { CreatePropertiesRequestSchema } from "./schemas/PropertiesRequestSchema";

export class PropertiesController {
  constructor(private readonly propertiesModel: Properties) {}

  index: Handler = async (req, res, next) => {
    try {
      const properties = await this.propertiesModel.find();
      res.json(properties);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const property = await this.propertiesModel.findById(id);
      if (!property) throw new HttpError(404, "Property not found!");
      res.json(property);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreatePropertiesRequestSchema.parse(req.body);
      const newProperty = await this.propertiesModel.create(body);
      res.status(201).json({ newProperty });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = CreatePropertiesRequestSchema.partial().parse(req.body);
      const updatedProperty = await this.propertiesModel.updateById(id, body);
      if (!updatedProperty) throw new HttpError(404, "Property not found!");

      res.json({ updatedProperty });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedProperty = await this.propertiesModel.deleteById(id);
      if (!deletedProperty) throw new HttpError(404, "Property not found!");

      res.json({ deletedProperty });
    } catch (error) {
      next(error);
    }
  };

  addImages: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  removeImages: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  updateLocation: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
