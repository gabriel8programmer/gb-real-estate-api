import { UserRole } from "./users";

export interface SignInUserParams {
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    emailVerified: boolean;
    role: UserRole;
  };
  accessToken: string;
}

export interface AuthSocialResponse {
  user: {
    id: number;
    email: string;
    emailVerified: boolean;
  };
  accessToken: string;
}
