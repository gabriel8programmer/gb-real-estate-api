import { Handler } from "express";
import {
  AddImagesSchema,
  CreatePropertiesRequestSchema,
  PropertiesRequestQueryParams,
} from "../types/schemas/PropertiesRequestSchema";
import { PropertyServices } from "../services/PropertyServices";

export class PropertiesController {
  constructor(private readonly propertyServices: PropertyServices) {}

  index: Handler = async (req, res, next) => {
    try {
      const query = PropertiesRequestQueryParams.parse(req.query);
      const properties = await this.propertyServices.getPropertiesPaginated({
        ...query,
        price: {
          max: query.maxPrice,
          min: query.minPrice,
        },
      });
      res.json(properties);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const property = await this.propertyServices.getPropertyById(id);
      res.json(property);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreatePropertiesRequestSchema.parse(req.body);
      const newProperty = await this.propertyServices.createProperty(body);
      res.status(201).json({ newProperty });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = CreatePropertiesRequestSchema.partial().parse(req.body);
      const updatedProperty = await this.propertyServices.updatePropertyById(id, body);
      res.json({ updatedProperty });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedProperty = await this.propertyServices.deletePropertyById(id);
      res.json({ deletedProperty });
    } catch (error) {
      next(error);
    }
  };

  addImages: Handler = async (req, res, next) => {
    try {
      const propertyId = +req.params.propertyId;
      const { url } = AddImagesSchema.parse(req.body);

      // save url image
      await this.propertyServices.addImageToProperty(propertyId, url);

      res.json({ message: "Image added successfuly in property!" });
    } catch (error) {
      next(error);
    }
  };

  removeImages: Handler = async (req, res, next) => {
    try {
      const { propertyId, imageId } = req.params;

      // remove image from property
      await this.propertyServices.removeImageFromProperty(+propertyId, +imageId);

      res.json({ message: "Image removed successfuly from property!" });
    } catch (error) {
      next(error);
    }
  };
}
