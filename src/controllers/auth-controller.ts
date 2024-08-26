
import { Request, Response } from "express"
import userModel from "../models/user-model"
import { IUserDataToken } from "../types"

export default {

    //POST /auth/register
    register: async (req: Request, res: Response)=> {
      try {

        // Create the user in the database
        const newUser = await userModel.createUser(req.body);

        const { id, username, email, role } = newUser

        const userDataToken: IUserDataToken = newUser

        // Generate JWT token
        const token = req.generateToken?.(userDataToken)

        // Respond with the token and user data
        res.status(201).json({
            message: 'User created and logged in successfully!',
            token,
            user: newUser
        });
      } catch (error) {
          res.status(400).json({message: "Unable to create a user"})
      }
    },

    //POST /auth/login
    login: async (req: Request, res: Response) => {
        try {
            const users = await userModel.getAllUsers()
            res.status(200).json({data: users})
        } catch (error) {
            res.status(400).json({message: "Error"})   
        }
    }

}