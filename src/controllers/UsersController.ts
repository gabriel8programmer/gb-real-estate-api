import { Handler } from "express";
import {
  CreateUsersRequestSchema,
  UpdateUsersRequestSchema,
  UsersRequestQueryParams,
} from "../types/schemas/UsersRequestSchema";
import { UserServices } from "../services/UserServices";

export class UsersController {
  constructor(private readonly userServices: UserServices) {}

  index: Handler = async (req, res, next) => {
    try {
      const query = UsersRequestQueryParams.parse(req.query);
      const result = await this.userServices.getUsersPaginated(query);

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const user = await this.userServices.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreateUsersRequestSchema.parse(req.body);
      const newUser = await this.userServices.createUser(body);
      res.status(201).json({ newUser });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateUsersRequestSchema.parse(req.body);
      const updatedUser = await this.userServices.updateUserById(id, body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedUser = await this.userServices.deleteUserById(id);
      res.json({ deletedUser });
    } catch (error) {
      next(error);
    }
  };
}
