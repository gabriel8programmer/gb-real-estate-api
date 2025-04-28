import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";
import { userServices } from "../container";

export const VerifyTokenMiddleware: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new HttpError(401, "Invalid token!");

    const _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";
    const decodedToken = await jwt.verify(token, _JWT_SECRET_KEY);

    // verify user
  } catch (error) {
    next(error);
  }
};
