
import { Request, Response, NextFunction } from "express"
import { userSchema } from "../utils/zod-validator"

export default (req: Request, res: Response, next: NextFunction)=> {
    const data = { ...req.body}

    try {
        userSchema.parse(data)
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Invalid user data"})
    }

}