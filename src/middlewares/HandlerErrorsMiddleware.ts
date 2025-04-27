import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { ZodError } from "zod";
import { VerifyEmailError } from "../errors/VerifyEmailError";

export const HandlerErrorsMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
  } else if (error instanceof VerifyEmailError) {
    // specific case for verification email
    res.status(error.status).send(error.html);
  } else if (error instanceof ZodError) {
    res
      .status(400)
      .json({ name: error.name, message: error.errors.map((e) => e.message).join(".") });
  } else if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal server error!" });
  }
};
