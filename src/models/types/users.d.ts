import { User } from "@prisma/client";

export interface UserWhereParams {
  page?: number;
  pageSize?: number;
  name?: string;
  email?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  orderBy?: "name" | "email" | "createdAt";
  order?: "asc" | "desc";
  emailVerified?: boolean;
  enabled?: boolean;
  createdAt?: Date;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface UsersRepository {
  find: (where: UsersWhereParams) => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  count: (where: UserWhereParams) => Promise<number>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
