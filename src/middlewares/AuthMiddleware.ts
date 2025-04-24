import { Handler, Request } from "express";
import { OAuth2Client } from "google-auth-library";
import { HttpError } from "../errors/HttpError";

// get enviroment token
const CLIENT_ID_GOOGLE = process.env["AUDIENCE"];

// create google client
const googleClient = new OAuth2Client();

export class AuthMiddleware {
  // generic method for checking google id token
  static google: Handler = async (req: Request, res, next) => {
    try {
      // get token and validate
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new HttpError(401, "Invalid Token!");

      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID_GOOGLE,
      });

      // get payload
      const payload = ticket.getPayload();
      const expiresAt = payload?.exp;
      const now = Date.now();
      // validate expiration token
      if ((expiresAt as number) < now) throw new HttpError(401, "Expired token!");

      // define data user
      req.user = payload;

      next();
    } catch (error) {
      next(error);
    }
  };
}
