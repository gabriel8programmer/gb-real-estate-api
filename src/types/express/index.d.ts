import { AuthUserParams } from "../utils/auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserParams;
    }
  }
}
