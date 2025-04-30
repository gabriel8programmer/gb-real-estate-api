import { Handler, Request } from "express";
import { HttpError } from "../errors/HttpError";
import jwt, { Jwt } from "jsonwebtoken";
import { userServices } from "../container";
import { UserRole } from "../types/utils/users";
import { AuthUserResponse } from "../types/utils/auth";
import { UserRefreshClient } from "google-auth-library";

interface JwtPayload {
  id?: number;
  email?: string;
  role?: UserRole;
}

export class AuthMiddlewares {
  static verifyToken: Handler = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new HttpError(401, "Authorization header malformed or missing!");
      }
      const token = authHeader.split(" ")[1];

      const _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";
      const decodedToken = (await jwt.verify(token, _JWT_SECRET_KEY)) as JwtPayload;

      // verify if user exists
      if (typeof decodedToken !== "string" && decodedToken.email) {
        const user = await userServices.getUserByEmail(decodedToken.email);
        if (!user) throw new HttpError(404, "The token provided belongs to a user not found!");
        // define user authenticated for the loaded user
        req.user = user;
      } else {
        throw new HttpError(401, "Invalid token payload!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  static authorize = (...allowedRoles: UserRole[]): Handler => {
    return (req, res, next) => {
      try {
        const role = req.user?.role;
        if (!role) throw new HttpError(404, "User role required!");

        if (!allowedRoles.includes(role)) {
          throw new HttpError(403, "Access denied!");
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
