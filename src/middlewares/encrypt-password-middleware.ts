
import { Request, Response, NextFunction } from "express"
import { hashPassword } from "../utils/handle-password"

export default async (req: Request, res: Response, next: NextFunction)=> {

    const password = req.body.password
    const saltRounds = 10

    try {
        req.body.password = await hashPassword(password, saltRounds)
        next()
    } catch (error) {
        res.status(500).json({ message: 'Error encrypting password' });
    }
}