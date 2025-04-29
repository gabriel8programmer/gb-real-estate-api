import { UserRole } from "./users";

export interface AuthRegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface AuthLoginParams {
  email: string;
  password: string;
}

export interface SignInUserParams {
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
}

export interface AuthUserResponse {
  id: number;
  email: string;
  emailVerified: boolean;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUserResponse;
  accessToken: string;
}
