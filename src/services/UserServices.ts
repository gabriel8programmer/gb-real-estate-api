import { UserWhereParams } from "../models/types/users";
import { Users } from "../models/Users";
import { UsersPaginated } from "./types/users";

export class UserServices {
  constructor(private readonly usersModel: Users) {}

  async getUsersPaginated(params: UsersPaginated) {
    const { page = 1, pageSize = 10, name, email } = params;

    const where: UserWhereParams = {
      ...params,
      name: { contains: name },
      email: { contains: email },
    };

    const users = await this.usersModel.find(where);
    const total = await this.usersModel.count(where);

    return {
      data: users,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
