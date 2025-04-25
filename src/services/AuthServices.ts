import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { CreateUserParams } from "../types/utils/users";
import { SignInUserParams, AuthSocialResponse, AuthResponse } from "../types/utils/auth";
import { UserServices } from "./UserServices";
import fs from "node:fs";
import path from "node:path";
import { sendMail } from "../configs/nodemailer";

export class AuthServices {
  private _URL_API = process.env.URL_API;
  private _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key_string";
  private _expiresAtJwtTokenDefault = "1d"; // default 1 day
  private _verifiedEmailEndpointLink = (token: string) =>
    `http://${this._URL_API}/api/auth/verify-email/${token}`;

  constructor(private readonly userServices: UserServices) {}

  private getNewAccessToken = async (
    payload: { email: string; id?: number },
    expiresAt?: string
  ) => {
    return jwt.sign(payload, this._JWT_SECRET_KEY, {
      expiresIn: expiresAt || this._expiresAtJwtTokenDefault,
    });
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

  async sendMailVerification(email: string) {
    const emailTemplate = fs.readFileSync(
      path.resolve("src/templates/emails/verify-email-template.html"),
      { encoding: "utf8" }
    );

    // get user name
    const { id, name } = await this.userServices.getUserByEmail(email);

    // config html template
    let html = emailTemplate.replace("{{name}}", name.split(" ")[0]);
    // reuse get new acess token function for to get a email token
    const token = await this.getNewAccessToken({ email, id }, "15m");
    html = html.replace("{{verificationLink}}", this._verifiedEmailEndpointLink(token));

    // send email verification
    sendMail({ toEmail: email, subject: "Verificação de email", html });
  }

  async verifyEmail(validateToken: string) {
    // validate token
    const decodedToken = await jwt.verify(validateToken, this._JWT_SECRET_KEY);
    if (!decodedToken) throw new HttpError(401, "Invalid Token!");

    // validate user, update email verified and returning some data user
    const { id: userId } = decodedToken as jwt.JwtPayload;
    const { id, email, emailVerified, role } = await this.userServices.updateUserById(userId, {
      emailVerified: true,
    });

    return { id, email, emailVerified, role };
  }
}
