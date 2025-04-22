import { Handler } from "express";
import { RegisterRequestSchema } from "./schemas/AuthRequestSchema";
import { prisma } from "../database";

export class AuthController {
  static register: Handler = async (req, res, next) => {
    try {
      const { name, email, password } = RegisterRequestSchema.parse(req.body);
      // create user
      const newUser = await prisma.user.create({ data: { name, email, password } });
    } catch (error) {
      next(error);
    }
  };

  static login: Handler = async (req, res, next) => {};
}
