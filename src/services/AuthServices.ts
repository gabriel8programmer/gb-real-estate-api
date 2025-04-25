import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { CreateUserParams } from "../types/utils/users";
import { SignInUserParams, AuthSocialResponse, AuthResponse } from "../types/utils/auth";
import { UserServices } from "./UserServices";

export class AuthServices {
  private _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key_string";
  private expiresAtJwtTokenDefault = "1d"; // default 1 day

  constructor(private readonly userServices: UserServices) {}

  private getNewAccessToken = async (payload: { email: string }) => {
    return jwt.sign(payload, this._JWT_SECRET_KEY, { expiresIn: this.expiresAtJwtTokenDefault });
  };

  // common register with email and password
  async registerUser(params: CreateUserParams): Promise<AuthResponse> {
    // create user in database
    const user = await this.userServices.createUser(params);

    // creating payload and accesstoken and returning accesstoken
    const payload = { email: params.email };
    const accessToken = await this.getNewAccessToken(payload);

    return { user, accessToken };
  }

  // common login with email and password
  async login(params: { email: string; password: string }): Promise<AuthResponse> {
    // validate user and password
    const user = await this.userServices.getUserByEmail(params.email);
    const passwordValidate = await bcrypt.compare(params.password, user?.password as string);
    if (!user || !passwordValidate) throw new HttpError(401, "Invalid credentials!");

    // creating payload and accesstoken and returning accesstoken with users data
    const payload = { email: params.email };
    const accessToken = await this.getNewAccessToken(payload);

    return { user, accessToken };
  }

  // social login or register
  async signInSocial(params: SignInUserParams): Promise<AuthSocialResponse> {
    const { email, name, email_verified: emailVerified } = params;

    // find user in database
    const user = await this.userServices.getUserByEmail(email);

    // if user is not exists then create a new user in database
    if (!user) {
      // creating new user returning new accesstoken
      const newUser = await this.userServices.createUser({ name, email, emailVerified });
      const payload = { email };
      const accessToken = await this.getNewAccessToken(payload);

      return { user: newUser, accessToken };
    }

    // creating payload and accesstoken and returning accesstoken with users data
    const payload = { email: params.email };
    const accessToken = await this.getNewAccessToken(payload);

    return { user, accessToken };
  }
}
