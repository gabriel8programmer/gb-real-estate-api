import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { Properties } from "../models/Properties";
import { CreatePropertyParams, PropertyWhereParams } from "../types/utils/properties";

export class PropertyServices {
  constructor(private readonly propertiesModel: Properties) {}

  async getPropertiesPaginated(params: PropertyWhereParams) {
    const { page = 1, pageSize = 10 } = params;

    const properties = await this.propertiesModel.find(params);
    const total = await this.propertiesModel.count(params);

    return {
      data: properties,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getPropertyById(id: number) {
    const property = await this.propertiesModel.findById(id);
    if (!property) throw new HttpError(404, "Property not found!");
    return property;
  }

  async createProperty(params: CreatePropertyParams) {
    return this.propertiesModel.create(params);
  }

  async updatePropertyById(id: number, params: Partial<CreatePropertyParams>) {
    const updatedProperty = await this.propertiesModel.updateById(id, params);
    if (!updatedProperty) throw new HttpError(404, "Property not found!");
    return updatedProperty;
  }

  async deletePropertyById(id: number) {
    const deletedProperty = await this.propertiesModel.deleteById(id);
    if (!deletedProperty) throw new HttpError(404, "Property not found!");
    return deletedProperty;
  }

  async addImageToProperty(propertyId: number, url: string) {
    // validate property
    const propertyExists = await this.propertiesModel.findById(propertyId);
    if (!propertyExists) throw new HttpError(404, "Property not found!");

    return await this.propertiesModel.addImage(propertyId, url);
  }

  async removeImageFromProperty(propertyId: number, imageId: number) {
    // validate property
    const propertyExists = await this.propertiesModel.findById(propertyId);
    if (!propertyExists) throw new HttpError(404, "Property not found!");

    // validate image
    const imageExists = await prisma.propertyImage.findUnique({
      where: { id: imageId, propertyId },
    });

    if (!imageExists) throw new HttpError(404, "Image not founded in property!");

    return await this.propertiesModel.removeImage(propertyId, imageId);
  }
}
