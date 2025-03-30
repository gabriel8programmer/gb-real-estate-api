import { HttpError } from "../errors/HttpError";
import { UsersRepository, CreateUserParams } from "../repositories/UsersRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(params: CreateUserParams) {
    const { password } = params;

    // encrypt password
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(password, saltRounds);

    Object.assign(params, { password: encryptPassword });

    return this.usersRepository.create(params);
  }

  async login(params: Omit<CreateUserParams, "name">) {
    const { email, password } = params;

    // get user
    const user = await this.usersRepository.findByEmail(email);

    // validate user
    if (!user) throw new HttpError(404, "User not found!");
    // validated password
    if (!user.password) throw new HttpError(400, "Password is necessary!");

    // test passwrod sended in params
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) throw new HttpError(400, "Invalid Credentials!");

    // generate jwt token
    const jwtSecretKey = process.env.JWT_SECRET_KEY || "super_secret_jwt_key";
    const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: "1d" });

    return token;
  }
}
