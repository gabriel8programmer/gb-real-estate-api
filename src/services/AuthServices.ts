import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import {
  SignInUserParams,
  AuthResponse,
  AuthRegisterParams,
  AuthLoginParams,
  AuthUserResponse,
} from "../types/utils/auth";
import { Users } from "../models/Users";
import fs from "node:fs";
import path from "node:path";
import { sendMail } from "../configs/nodemailer";
import { VerifyEmailError } from "../errors/VerifyEmailError";

export class AuthServices {
  private _URL_API = process.env.URL_API;
  private _JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key_string";
  private _expiresAtJwtTokenDefault = "1d"; // default 1 day
  private _verifiedEmailEndpointLink = (token: string) =>
    `http://${this._URL_API}/api/auth/verify-email/${token}`;

  constructor(private readonly usersModel: Users) {}

  private getNewAccessToken = async (
    payload: { email?: string; id?: number },
    expiresAt?: string
  ) => {
    return jwt.sign(payload, this._JWT_SECRET_KEY, {
      expiresIn: expiresAt || this._expiresAtJwtTokenDefault,
    });
  };

  private formatAuthUser = (user: any) => {
    return {
      id: user?.id,
      email: user?.email,
      emailVerified: user?.emailVerified,
      role: user?.role,
    };
  };

  // common register with email and password
  async registerUser(params: AuthRegisterParams): Promise<AuthUserResponse> {
    // destructuring
    const { email, password } = params;

    // encrypt password
    params.password = await bcrypt.hash(password, 10);

    // validate user
    const userExists = await this.usersModel.findByEmail(email);
    if (userExists) throw new HttpError(401, "User email address already in use!");

    // create user and return
    const newUser: AuthUserResponse = await this.usersModel.create(params);
    return newUser;
  }

  // common login with email and password
  async login(params: AuthLoginParams): Promise<AuthResponse> {
    // destructuring
    const { email, password } = params;

    // validate user and password
    const user = await this.usersModel.findByEmail(email);
    const passwordValidate = await bcrypt.compare(password, user?.password as string);
    if (!user || !passwordValidate) throw new HttpError(401, "Invalid credentials!");

    // creating payload and accesstoken and returning accesstoken with users data
    const accessToken = await this.getNewAccessToken({ email });
    return { user: this.formatAuthUser(user), accessToken };
  }

  // social login or register
  async signInSocial(params: SignInUserParams): Promise<AuthResponse> {
    // destructuring
    const { email, name, email_verified: emailVerified } = params;

    // find user in database
    const user = await this.usersModel.findByEmail(email);

    // if user is not exists then create a new user in database
    if (!user) {
      // creating new user returning new accesstoken
      const newUser = await this.usersModel.create({ name, email, emailVerified });
      const accessToken = await this.getNewAccessToken({ email });
      return { user: this.formatAuthUser(newUser), accessToken };
    }

    // creating payload and accesstoken and returning accesstoken with users data
    const accessToken = await this.getNewAccessToken({ email });
    return { user: this.formatAuthUser(user), accessToken };
  }

  async sendMailVerification(email: string) {
    const emailTemplate = fs.readFileSync(
      path.resolve("src/templates/emails/verify-email-template.html"),
      { encoding: "utf8" }
    );

    // get user name
    const user = await this.usersModel.findByEmail(email);
    if (!user) throw new HttpError(404, "User not found!");

    const { name, id } = user;

    // config html template
    let html = emailTemplate.replace("{{name}}", name.split(" ")[0]);
    // reuse get new acess token function for to get a email token
    const token = await this.getNewAccessToken({ email, id }, "15m");
    html = html.replace("{{verificationLink}}", this._verifiedEmailEndpointLink(token));

    // send email verification
    sendMail({ toEmail: email, subject: "Verificação de email", html });
  }

  async verifyEmail(validateToken: string) {
    // get html template success
    const responseSuccessTemplate = fs.readFileSync(
      path.resolve("src/templates/emails/verify-email-success-template.html"),
      { encoding: "utf8" }
    );

    // get html template error
    const responseErrorTemplate = fs.readFileSync(
      path.resolve("src/templates/emails/verify-email-error-template.html"),
      { encoding: "utf8" }
    );

    // returns html error template file if any error occurs
    try {
      // try verify jwt token sended
      await jwt.verify(validateToken, this._JWT_SECRET_KEY);
      return responseSuccessTemplate;
    } catch (error) {
      throw new VerifyEmailError(401, responseErrorTemplate);
    }
  }
}
