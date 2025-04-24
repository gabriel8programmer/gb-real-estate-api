import { UserInfo } from "../utils";

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
