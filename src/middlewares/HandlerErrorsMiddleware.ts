import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { ZodError } from "zod";

export const HandlerErrorsMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
  } else if (error instanceof ZodError) {
    console.log(error.errors);
    res
      .status(400)
      .json({ name: error.name, message: error.errors.map((e) => e.message).join(".") });
  } else if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal server error!" });
  }
};
