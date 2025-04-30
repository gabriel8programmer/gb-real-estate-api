import { Handler } from "express";
import { OAuth2Client } from "google-auth-library";
import { HttpError } from "../errors/HttpError";

// get enviroments consts
const CLIENT_ID_GOOGLE = process.env["AUDIENCE"];

// create google client
const googleClient = new OAuth2Client();

export class OAuthMiddleware {
  // generic method for checking google id token
  static google: Handler = async (req, res, next) => {
    try {
      // get token and validate
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new HttpError(401, "Token Required!");

      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID_GOOGLE,
      });

      // define data user
      const payload = ticket.getPayload();
      req.user = payload;

      next();
    } catch (error: any) {
      if (typeof error.message === "string" && error.message.includes("Token used too late")) {
        return next(new HttpError(401, "Expired token!"));
      }
      next(error);
    }
  };
}
