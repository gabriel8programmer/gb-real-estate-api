import { RentalRequest } from "@prisma/client";
import { CreateRentalRequestParams, RentalRequestsRepository } from "../types/utils/rentalRequests";
import { prisma } from "../database";

export class RentalRequests implements RentalRequestsRepository {
  async find(): Promise<RentalRequest[]> {
    return prisma.rentalRequest.findMany();
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
