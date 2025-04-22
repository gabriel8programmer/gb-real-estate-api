import { PropertyType } from "@prisma/client";
import { PropertyTypesRepository } from "./types/properties";
import { prisma } from "../database";

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
