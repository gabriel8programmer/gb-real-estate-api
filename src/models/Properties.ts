import { Location, Property } from "@prisma/client";
import {
  CreatePropertyParams,
  PropertiesRepository,
  PropertyImage,
  PropertyLocation,
} from "./types";
import { prisma } from "../database";

export class Properties implements PropertiesRepository {
  async find(): Promise<Property[]> {
    return prisma.property.findMany({ include: { images: true, location: true } });
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({ where: { id }, include: { images: true, location: true } });
  }

  async create(params: CreatePropertyParams): Promise<Property> {
    const {
      title,
      description,
      price,
      size,
      propertyTypeId,
      bedrooms,
      bathrooms,
      status,
      images,
      location,
    } = params;

    return prisma.$transaction(async (tx) => {
      // create property
      const property = await tx.property.create({
        data: { title, description, price, size, propertyTypeId, bedrooms, bathrooms, status },
      });

      // if images exists then create images
      if (images && images.length > 0) {
        await tx.propertyImage.createMany({
          data: images.map((image) => {
            return {
              propertyId: property.id,
              url: image.url,
            };
          }),
        });
      }

      // if location is diferent of null then define location value too
      if (location) {
        await tx.location.create({
          data: {
            ...location,
            propertyId: property.id,
          },
        });
      }

      return property;
    });
  }

  async updateById(
    id: number,
    params: Partial<Omit<CreatePropertyParams, "images" | "location">>
  ): Promise<Property | null> {
    return prisma.property.update({
      where: { id },
      data: params,
    });
  }

  async deleteById(id: number): Promise<Property> {
    return prisma.property.delete({ where: { id } });
  }

  async addImages(propertyId: number, images: PropertyImage[]): Promise<void> {
    await prisma.propertyImage.createMany({
      data: images.map((image) => ({
        url: image.url,
        propertyId,
      })),
    });
  }

  async removeImages(propertyId: number, imageIds: number[]): Promise<void> {
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        images: {
          disconnect: imageIds.map((imgId) => ({ id: imgId })),
        },
      },
    });
  }

  async updateLocation(propertyId: number, location: PropertyLocation): Promise<Location | null> {
    return prisma.location.update({
      where: { propertyId },
      data: location,
    });
  }
}
