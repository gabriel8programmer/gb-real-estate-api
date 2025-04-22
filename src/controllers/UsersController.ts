import { Handler } from "express";
import { Users } from "../models/Users";
import {
  CreateUsersRequestSchema,
  UpdateUsersRequestSchema,
  UsersRequestQueryParams,
} from "./schemas/UsersRequestSchema";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
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

  // show: Handler = async (req, res, next) => {
  //   try {
  //     const id = +req.params.id;
  //     const user = await this.userServices.findById(id);
  //     if (!user) throw new HttpError(404, "User not found!");

  //     res.json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // save: Handler = async (req, res, next) => {
  //   try {
  //     const body = CreateUsersRequestSchema.parse(req.body);

  //     if (body.password) {
  //       const encryptedPassword = await bcrypt.hash(body.password, 10);
  //       Object.assign(body, { password: encryptedPassword });
  //     }

  //     const newUser = await this.userServices.create(body);
  //     res.status(201).json({ newUser });
  //     res.json(newUser);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // update: Handler = async (req, res, next) => {
  //   try {
  //     const id = +req.params.id;
  //     const body = UpdateUsersRequestSchema.parse(req.body);

  //     if (body.password) {
  //       const encryptedPassword = await bcrypt.hash(body.password, 10);
  //       Object.assign(body, { password: encryptedPassword });
  //     }

  //     const updatedUser = await this.userServices.updateById(id, body);
  //     if (!updatedUser) throw new HttpError(404, "User not found!");

  //     res.json(updatedUser);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // delete: Handler = async (req, res, next) => {
  //   try {
  //     const id = +req.params.id;
  //     const deletedUser = await this.userServices.deleteById(id);
  //     if (!deletedUser) throw new HttpError(404, "User not found!");

  //     res.json({ deletedUser });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
