import { Rental } from "@prisma/client";

export type RentalStatus = "Actived" | "Finished" | "Canceled";

export interface RentalWhereParams {}

export interface CreateRentalParams {
  startContractDate: Date;
  endContractDate: Date;
  contractUrl: string;
  status: RentalStatus;
}

export class RentalsRepository {
  find: () => Promise<Rental[]>;
  findById: (id: number) => Promise<Rental | null>;
  create: (params: CreateRentalParams) => Promise<Rental>;
  updateById: (id: number, params: Partial<CreateRentalParams>) => Promise<Rental | null>;
  deleteById: (id: number) => Promise<Rental | null>;
}
