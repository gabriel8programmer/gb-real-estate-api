import { CreateRentalRequestParams, RentalRequestWhereParams } from "../types/utils/rentalRequests";
import { RentalRequests } from "../models/RentalRequests";
import { HttpError } from "../errors/HttpError";

export class RentalRequestServices {
  constructor(private readonly rentalRequestsModel: RentalRequests) {}

  async getRentalRequestsPaginated(params: RentalRequestWhereParams) {
    const { page = 1, pageSize = 10 } = params;

    const rentalRequest = await this.rentalRequestsModel.find(params);
    const total = await this.rentalRequestsModel.count(params);

    return {
      data: rentalRequest,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getRentalRequestById(id: number) {
    const rentalRequest = await this.rentalRequestsModel.findById(id);
    if (!rentalRequest) throw new HttpError(404, "Rental request not found!");
    return rentalRequest;
  }

  async createRentalRequest(params: CreateRentalRequestParams) {
    return this.rentalRequestsModel.create(params);
  }

  async updateRentalRequestById(
    id: number,
    params: Partial<Pick<CreateRentalRequestParams, "endDate" | "status">>
  ) {
    const updatedRentalRequest = await this.rentalRequestsModel.updateById(id, params);
    if (!updatedRentalRequest) throw new HttpError(404, "Rental request not found!");
    return updatedRentalRequest;
  }

  async deleteRentalRequestById(id: number) {
    const deletedRentalRequest = await this.rentalRequestsModel.deleteById(id);
    if (!deletedRentalRequest) throw new HttpError(404, "Rental request not found!");
    return deletedRentalRequest;
  }
}
