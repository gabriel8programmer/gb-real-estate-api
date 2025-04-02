import { Client, User } from "@prisma/client";

// user's interfaces

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface UsersRepository {
  find: () => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}

// client's interfaces

export type MaterialStatus =
  | "Single"
  | "Married"
  | "Divorced"
  | "Widowed"
  | "Separated"
  | "Engaged";

export interface CreateClientParams {
  birthDate: Date;
  phone: string;
  cpf: string;
  rg?: string;
  materialStatus?: MaterialStatus;
  gender?: "MALE" | "FEMALE";
  userId: number;
}

export interface ClientsRepository {
  findById: (id: number) => Promise<Client | null>;
  create: (params: CreateClientParams) => Promise<Client>;
  updateById: (id: number, params: Partial<CreateClientParams>) => Promise<Client | null>;
  deleteById: (id: number) => Promise<Client | null>;
}
