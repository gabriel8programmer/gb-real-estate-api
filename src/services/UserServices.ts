import { PassThrough } from "stream";
import { UserWhereParams } from "../models/types/users";
import { Users } from "../models/Users";
import { CreateUserParams, UsersPaginated } from "./types/users";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";

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

  async getUserById(id: number) {
    const user = await this.usersModel.findById(id);
    if (!user) throw new HttpError(404, "User not found!");
    return user;
  }

  async createUser(params: CreateUserParams) {
    // encrypt password
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    return this.usersModel.create(params);
  }

  async updateUserById(id: number, params: Partial<CreateUserParams>) {
    // encrypt password
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    const updatedUser = await this.usersModel.updateById(id, params);
    if (!updatedUser) throw new HttpError(404, "User not found!");
    return updatedUser;
  }

  async deleteUserById(id: number) {
    const deletedUser = await this.usersModel.deleteById(id);
    if (!deletedUser) throw new HttpError(404, "User not found!");
    return deletedUser;
  }
}
