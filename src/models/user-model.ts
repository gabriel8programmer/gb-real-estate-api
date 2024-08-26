import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export default {

    createUser: async (user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
        const newUser = await prisma.user.create({data: user})
        return newUser
    },

    getAllUsers: async ()=> {
        const users = await prisma.user.findMany()
        return users
    },

    selectUsers: ()=> {

    },

    selectOneUser: (id: string)=> {

    },

    updateUser: (id: string, user: User)=> {

    },

    deleteUser: (id: string)=> {

    }
}