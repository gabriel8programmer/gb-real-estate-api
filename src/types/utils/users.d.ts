import { User } from "@prisma/client";
import { PaginationParams } from ".";

export type UserRole = "ADMIN" | "AGENT" | "CLIENT";

export interface UserWhereParams {
  name?: {
    contains?: string;
    mode?: "insensitive" | "default";
  };
  email?: {
    contains?: string;
    mode?: "insensitive" | "default";
  };
  role?: UserRole;
  createdAt?: Date;
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface FindUserParams extends PaginationParams {
  where: UserWhereParams;
  orderBy?: "name" | "email" | "createdAt";
}

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface UsersRepository {
  find: (params: FindUserParams) => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  count: (where: UserWhereParams) => Promise<number>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
