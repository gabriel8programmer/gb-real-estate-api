import { Property } from "@prisma/client";
import {
  CreatePropertyParams,
  PropertiesRepository,
  PropertyWhereParams,
} from "../types/utils/properties";
import { prisma } from "../configs/prisma";

export class Properties implements PropertiesRepository {
  async find(where: PropertyWhereParams): Promise<Property[]> {
    const { page = 1, pageSize = 10, type, price, orderBy = "title", order = "asc" } = where;

    return prisma.property.findMany({
      where: {
        price: {
          lte: price?.max,
          gte: price?.min,
        },
        propertyType: {
          name: {
            contains: type,
            mode: "insensitive",
          },
        },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { [orderBy]: order },
    });
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          select: { id: true, url: true },
        },
        location: true,
      },
    });
  }

  async count(where: PropertyWhereParams): Promise<number> {
    const { type, price } = where;
    return prisma.property.count({
      where: {
        price: {
          lte: price?.max,
          gte: price?.min,
        },
        propertyType: {
          name: {
            contains: type,
            mode: "insensitive",
          },
        },
      },
    });
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
    await prisma.propertyImage.delete({ where: { id: imageId, propertyId } });
  }
}
