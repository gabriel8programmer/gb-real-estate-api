import { RentalRequest } from "@prisma/client";

export type RentalRequestStatus = "Pending" | "Aproved" | "Rejected";

export interface CreateRentalRequestParams {
  clientId: number;
  propertyId: number;
  budget: number;
  endDate: Date;
  status: RentalRequestStatus;
}

export interface RentalRequestsRepository {
  find: () => Promise<RentalRequest[]>;
  findById: (id: number) => Promise<RentalRequest | null>;
  create: (params: CreateRentalRequestParams) => Promise<RentalRequest>;
  updateById: (
    id: number,
    params: Partial<Pick<CreateRentalRequestParams, "status" | "endDate">>
  ) => Promise<RentalRequest | null>;
  deleteById: (id: number) => Promise<RentalRequest | null>;
}
