import { User } from "@prisma/client";
import { prisma } from "../database";
import { CreateUserParams, UsersRepository } from "./types";

export class Users implements UsersRepository {
  async find(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(params: CreateUserParams): Promise<User> {
    return prisma.user.create({ data: params });
  }

  async updateById(id: number, params: Partial<CreateUserParams>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data: params });
  }

  async deleteById(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
