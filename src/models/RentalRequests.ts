import { RentalRequest } from "@prisma/client";
import {
  CreateRentalRequestParams,
  RentalRequestsRepository,
  RentalRequestWhereParams,
} from "../types/utils/rentalRequests";
import { prisma } from "../configs/prisma";

export class RentalRequests implements RentalRequestsRepository {
  async find(where: RentalRequestWhereParams): Promise<RentalRequest[]> {
    const {
      page = 1,
      pageSize = 10,
      order,
      orderBy = "createdAt",
      status,
      clientId,
      propertyId,
    } = where;

    return prisma.rentalRequest.findMany({
      where: {
        status,
        clientId,
        propertyId,
      },
      take: pageSize,
      skip: pageSize * (page - 1),
      orderBy: { [orderBy]: order },
    });
  }

  async findById(id: number): Promise<RentalRequest | null> {
    return await prisma.rentalRequest.findUnique({
      where: { id },
      include: {
        client: true,
        property: true,
      },
    });
  }

  async create(params: CreateRentalRequestParams): Promise<RentalRequest> {
    return await prisma.rentalRequest.create({ data: params });
  }

  async count(params: RentalRequestWhereParams): Promise<number> {
    const { clientId, propertyId, status } = params;
    return prisma.rentalRequest.count({ where: { clientId, propertyId, status } });
  }

  async updateById(
    id: number,
    params: Partial<Pick<CreateRentalRequestParams, "status" | "endDate">>
  ): Promise<RentalRequest | null> {
    return await prisma.rentalRequest.update({ where: { id }, data: params });
  }

  async deleteById(id: number): Promise<RentalRequest | null> {
    return await prisma.rentalRequest.delete({ where: { id } });
  }
}
