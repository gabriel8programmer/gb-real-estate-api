import { UserRole } from "../utils/users";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: number;
        email?: string;
        role?: UserRole;
      };
    }
  }
}
