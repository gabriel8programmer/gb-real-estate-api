import { Client } from "@prisma/client";
import { ClientsRepository, CreateClientParams } from "./types/clients";
import { prisma } from "../database";

export class Clients implements ClientsRepository {
  async findById(id: number): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            password: true,
            emailVerified: true,
            enabled: true,
          },
        },
      },
    });
  }

  async create(params: CreateClientParams): Promise<Client> {
    return prisma.client.create({ data: params });
  }

  async updateById(id: number, params: Partial<CreateClientParams>): Promise<Client | null> {
    return prisma.client.update({ where: { id }, data: params });
  }

  async deleteById(id: number): Promise<Client | null> {
    return prisma.client.delete({ where: { id } });
  }
}
