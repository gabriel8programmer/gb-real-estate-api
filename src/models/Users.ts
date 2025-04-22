import { User } from "@prisma/client";
import { prisma } from "../database";
import { CreateUserParams, UsersRepository, UserWhereParams } from "./types/users";

export class Users implements UsersRepository {
  async find(where: UserWhereParams): Promise<User[]> {
    const {
      page = 1,
      pageSize = 10,
      name,
      email,
      role,
      emailVerified,
      enabled,
      createdAt,
      order = "asc",
      orderBy = "name",
    } = where;

    const limit = (page - 1) * pageSize;

    return prisma.user.findMany({
      where: { name, email, role, emailVerified, enabled, createdAt },
      take: pageSize,
      skip: limit,
      orderBy: { [orderBy]: order },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async count(where: UserWhereParams): Promise<number> {
    const { name, email, role, emailVerified, enabled } = where;

    return prisma.user.count({
      where: { name, email, role, emailVerified, enabled },
    });
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
