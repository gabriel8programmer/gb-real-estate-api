import { User } from "@prisma/client";
import { prisma } from "../configs/prisma";
import {
  CreateUserParams,
  FindUserParams,
  UsersRepository,
  UserWhereParams,
} from "../types/utils/users";

export class Users implements UsersRepository {
  async find(params: FindUserParams): Promise<User[]> {
    const { page = 1, pageSize = 10, where, order = "asc", orderBy = "name" } = params;

    const limit = (page - 1) * pageSize;

    return prisma.user.findMany({
      where,
      take: pageSize,
      skip: limit,
      orderBy: { [orderBy]: order },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async count(where: UserWhereParams): Promise<number> {
    return prisma.user.count({ where });
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
