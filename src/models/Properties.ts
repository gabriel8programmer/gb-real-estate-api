import { Property } from "@prisma/client";
import {
  CreatePropertyParams,
  PropertiesRepository,
  PropertyWhereParams,
} from "./types/properties";
import { prisma } from "../database";

export class Properties implements PropertiesRepository {
  async find(where: PropertyWhereParams): Promise<Property[]> {
    const { page = 1, pageSize = 10, orderBy = "title", order = "asc" } = where;

    return prisma.property.findMany({
      where: {
        ...where,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { [orderBy]: order },
    });
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({ where: { id }, include: { images: true, location: true } });
  }

  async count(where: PropertyWhereParams): Promise<number> {
    return prisma.property.count({ where });
  }

  async create(params: CreatePropertyParams): Promise<Property> {
    return prisma.property.create({
      data: {
        ...params,
        location: {
          create: {
            ...params.location,
          },
        },
      },
    });
  }

  async updateById(id: number, params: Partial<CreatePropertyParams>): Promise<Property | null> {
    return prisma.property.update({
      where: { id },
      data: {
        ...params,
        location: {
          update: {
            ...params.location,
          },
        },
      },
    });
  }

  async deleteById(id: number): Promise<Property> {
    return prisma.property.delete({ where: { id } });
  }

  async addImage(propertyId: number, url: string): Promise<void> {
    await prisma.propertyImage.create({ data: { url, propertyId } });
  }

  async removeImage(propertyId: number, imageId: number): Promise<void> {
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        images: {
          disconnect: {
            id: imageId,
          },
        },
      },
    });
  }
}
