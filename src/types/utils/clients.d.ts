import { Client } from "@prisma/client";

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
