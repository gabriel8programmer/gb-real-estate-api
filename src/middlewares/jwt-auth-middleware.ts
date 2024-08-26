
import { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {IUserDataToken} from "../types"

const jwtSecretKey = process.env.JWT_SECRET_KEY || "json_web_token_default"

declare global {
    namespace Express {
        interface Request {
            generateToken?: (userDataToken: IUserDataToken) => string
        }
    }
}

export default (req: Request, res: Response, next: NextFunction)=> {
    req.generateToken = (userDataToken: IUserDataToken)=> {
        return jwt.sign(userDataToken, jwtSecretKey, { expiresIn: '1h'})
    }
    next()
}