import { Handler } from "express";
import { Users } from "../models/Users";
import { CreateUsersRequestSchema, UpdateUsersRequestSchema } from "./schemas/UsersRequestSchema";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";

export class UsersController {
  constructor(private readonly usersModel: Users) {}

  index: Handler = async (req, res, next) => {
    try {
      const users = await this.usersModel.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const users = await this.usersModel.findById(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreateUsersRequestSchema.parse(req.body);

      if (body.password) {
        const encryptedPassword = await bcrypt.hash(body.password, 10);
        Object.assign(body, { password: encryptedPassword });
      }

      const newUser = await this.usersModel.create(body);
      res.status(201).json({ newUser });
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateUsersRequestSchema.parse(req.body);

      if (body.password) {
        const encryptedPassword = await bcrypt.hash(body.password, 10);
        Object.assign(body, { password: encryptedPassword });
      }

      const updatedUser = await this.usersModel.updateById(id, body);
      if (!updatedUser) throw new HttpError(404, "User not found!");

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedUser = await this.usersModel.deleteById(id);
      if (!deletedUser) throw new HttpError(404, "User not found!");

      res.json({ deletedUser });
    } catch (error) {
      next(error);
    }
  };
}
