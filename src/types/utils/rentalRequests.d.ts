import { RentalRequest } from "@prisma/client";

export type RentalRequestStatus = "Pending" | "Aproved" | "Rejected";

export interface CreateRentalRequestParams {
  clientId: number;
  propertyId: number;
  budget: number;
  endDate: Date;
  status: RentalRequestStatus;
}

export interface RentalRequestWhereParams {
  page?: number;
  pageSize?: number;
  createdAt?: Date;
  status?: RentalRequestStatus;
  propertyId?: number;
  clientId?: number;
  orderBy?: "createdAt" | "id" | "endDate";
  order?: "asc" | "desc";
}

export interface RentalRequestsRepository {
  find: (where: RentalRequestWhereParams) => Promise<RentalRequest[]>;
  findById: (id: number) => Promise<RentalRequest | null>;
  create: (params: CreateRentalRequestParams) => Promise<RentalRequest>;
  count: (where: RentalRequestWhereParams) => Promise<number>;
  updateById: (
    id: number,
    params: Partial<Pick<CreateRentalRequestParams, "status" | "endDate">>
  ) => Promise<RentalRequest | null>;
  deleteById: (id: number) => Promise<RentalRequest | null>;
}
