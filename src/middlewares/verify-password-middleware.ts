import { Request, Response, NextFunction } from "express"
import { verifyPassword } from "../utils/handle-password"

declare global {
    namespace Express {
        interface Request {
            verifyPassword?: (password: string, hashedPassword: string)=> Promise<boolean>
        }
    }
}

export default (req: Request, res: Response, next: NextFunction)=> {

    req.verifyPassword = async (password: string, hashedPassword: string)=> {
        return await verifyPassword(password, hashedPassword)
    }

    next()

}