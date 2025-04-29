import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";
import { userServices } from "../container";

export class AuthMiddlewares {
  static verifyToken: Handler = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new HttpError(401, "Invalid token!");

      const _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";
      const decodedToken = await jwt.verify(token, _JWT_SECRET_KEY);

      // verify if user exists
      if (typeof decodedToken !== "string" && decodedToken.email) {
        const user = await userServices.getUserByEmail(decodedToken.email);
        if (!user) throw new HttpError(404, "The token provided belongs to a user not found!");
        // define user authenticated for the loaded user
        req.user = user;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
