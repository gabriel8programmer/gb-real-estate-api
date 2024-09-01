
import { Request, Response } from "express"
import userModel from "../models/user-model"
import { IUserDataToken } from "../types"
import { User } from "@prisma/client"

const createUserDataToken = (user: User): IUserDataToken => ({
    id: user.id,
    email: user.email,
    role: user.role
});


const generateToken = (req: Request, userDataToken: IUserDataToken): string | undefined => {
    return req.generateToken?.(userDataToken);
};

export default {

    //POST /auth/register
    register: async (req: Request, res: Response)=> {
      try {

        // Create the user in the database
        const user = await userModel.createUser(req.body)

        const userDataToken = createUserDataToken(user)

        // Generate JWT token
        const token = generateToken(req, userDataToken)

        // Respond with the token and user data
        res.status(201).json({
            message: "User created and logged in successfully!",
            user,
            token
        })

      } catch (error) {
          res.status(400).json({message: "Unable to register a user"})
      }
    },

    // POST /auth/login
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            // verify if user exists in the database
            const user: User | undefined = await userModel.getOneUserByEmail(email)
            if (!user) {
                return res.status(400).json({ message: "User not registered" })
            }

            // verify if password is valid
            const hashedPassword = user.password || ""
            const validPassword = await req.verifyPassword?.(password, hashedPassword)

            if (!validPassword) {
                return res.status(400).json({ message: "Invalid password!" })
            }

            const userDataToken = createUserDataToken(user)

            // Generate JWT token
            const token = generateToken(req, userDataToken)

            res.status(200).json({
                message: "User logged in successfully!",
                user,
                token
            })

        } catch (error) {
            res.status(400).json({ message: "Unable to login" })
        }
    }
}