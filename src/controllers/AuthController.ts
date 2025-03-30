import { Handler } from "express";
import { AuthService } from "../services/AuthService";
import { LoginAuthRequestSchema, RegisterAuthRequestSchema } from "./schemas/AuthRequestSchema";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register: Handler = async (req, res, next) => {
    try {
      const body = RegisterAuthRequestSchema.parse(req.body);
      const user = await this.authService.registerUser(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login: Handler = async (req, res, next) => {
    try {
      const body = LoginAuthRequestSchema.parse(req.body);
      const token = await this.authService.login(body);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  social: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  forgotPassword: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
