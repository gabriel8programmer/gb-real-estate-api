import { PropertyType } from "@prisma/client";
import { PropertyTypesRepository } from "../types/utils/properties";
import { prisma } from "../configs/prisma";

export class PropertyTypes implements PropertyTypesRepository {
  async find(): Promise<PropertyType[]> {
    return prisma.propertyType.findMany();
  }

  async create(params: { name: string }): Promise<PropertyType> {
    return prisma.propertyType.create({ data: params });
  }

  async updateNameById(id: number, name: string): Promise<PropertyType | null> {
    return prisma.propertyType.update({ where: { id }, data: { name } });
  }

  async deleteById(id: number): Promise<PropertyType> {
    return prisma.propertyType.delete({ where: { id } });
  }
}
