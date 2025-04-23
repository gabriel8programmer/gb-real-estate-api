import { Users } from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";

export class AuthServices {
  private static _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key_string";

  constructor(private readonly usersModel: Users) {}

  private static getNewAccessToken = async (
    payload: any,
    secretKey: string,
    expiresAt: string = "1d"
  ) => {
    return jwt.sign(payload, secretKey, { expiresIn: expiresAt });
  };

  async registerUser(params: { name: string; email: string; password: string }) {
    // create user in database
    await this.usersModel.create(params);

    // creating payload and accesstoken and returning accesstoken
    const payload = { email: params.email };
    return AuthServices.getNewAccessToken(payload, AuthServices._JWT_SECRET_KEY);
  }

  async login(params: { email: string; password: string }) {
    // validate user and password
    const user = await this.usersModel.findByEmail(params.email);
    const passwordValidate = await bcrypt.compare(params.password, user?.password as string);
    if (!user || !passwordValidate) throw new HttpError(401, "Invalid credentials!");

    // creating payload and accesstoken and returning accesstoken with users data
    const payload = { email: params.email };
    const accessToken = await AuthServices.getNewAccessToken(payload, AuthServices._JWT_SECRET_KEY);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }
}
