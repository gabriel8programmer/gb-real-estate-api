import { User } from "@prisma/client";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  enabled?: boolean;
}

export interface UsersRepository {
  find: () => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
