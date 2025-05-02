import { CreateUserParams, FindUserParams, UserRole } from "../types/utils/users";
import { Users } from "../models/Users";
import { UserWhereParams } from "../types/utils/users";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { PaginationParams } from "../types/utils";

interface QueryParams extends PaginationParams {
  name?: string;
  email?: string;
  role?: UserRole;
  emailVerified?: boolean;
  enabled?: boolean;
  orderBy?: "createdAt" | "name" | "email";
}

export class UserServices {
  constructor(private readonly usersModel: Users) {}

  async getUsersPaginated(params: QueryParams) {
    const {
      page = 1,
      pageSize = 10,
      name,
      email,
      role,
      emailVerified,
      enabled,
      order,
      orderBy,
    } = params;

    const userParams: FindUserParams = {
      where: {
        name: { contains: name, mode: "insensitive" },
        email: { contains: email, mode: "insensitive" },
        role,
        emailVerified,
        enabled,
      },
      page,
      pageSize,
      orderBy,
      order,
    };

    const users = await this.usersModel.find(userParams);
    const total = await this.usersModel.count(userParams.where);

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

  async getUserByEmail(email: string) {
    const user = await this.usersModel.findByEmail(email);
    if (!user) throw new HttpError(404, "User not found!");
    return user;
  }

  async createUser(params: CreateUserParams) {
    // encrypt password
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    // validate if user already exists by your email
    const userAlreadyExists = await this.usersModel.findByEmail(params.email);
    if (userAlreadyExists) throw new HttpError(401, "Email address already in use!");

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
