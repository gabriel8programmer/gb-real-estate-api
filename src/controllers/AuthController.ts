import { Handler } from "express";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  SocialRequestSchema,
} from "../types/schemas/AuthRequestSchema";
import { AuthServices } from "../services/AuthServices";

export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  register: Handler = async (req, res, next) => {
    try {
      const body = RegisterRequestSchema.parse(req.body);
      // get accessToken and return with a success message
      const accessToken = await this.authServices.registerUser(body);
      res.status(201).json({ message: "User registered successfuly", accessToken });
    } catch (error) {
      next(error);
    }
  };

  login: Handler = async (req, res, next) => {
    try {
      const body = LoginRequestSchema.parse(req.body);
      // get accessToken and return with a success message
      const { user, accessToken } = await this.authServices.login(body);
      res.json({ message: "User logged successfuly", user, accessToken });
    } catch (error) {
      next(error);
    }
  };

  social: Handler = async (req, res, next) => {
    try {
      const data = SocialRequestSchema.parse(req.user);
      // get response and returning json
      const response = await this.authServices.signInSocial(data);
      res.json({ message: "Signin user successfuly", response });
    } catch (error) {
      next(error);
    }
  };

  sendMail: Handler = async (req, res, next) => {
    try {
      // reuse loginschema validation email
      const { email } = LoginRequestSchema.pick({ email: true }).parse(req.body);
      await this.authServices.sendMailVerification(email);
      res.json({ message: "Email sended successfuly!" });
    } catch (error) {
      next(error);
    }
  };

  verifyEmail: Handler = async (req, res, next) => {
    try {
      const { token } = req.params;
      const dataUser = await this.authServices.verifyEmail(token);
      res.json({ message: "Email verified successfuly!", dataUser });
    } catch (error) {
      next(error);
    }
  };
}
