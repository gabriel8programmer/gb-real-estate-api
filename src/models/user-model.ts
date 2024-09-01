import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export default {

    createUser: async (user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
        const newUser = await prisma.user.create({ data: user })
        return newUser
    },

    getAllUsers: async (): Promise<User[]>=> {
        const users = await prisma.user.findMany()
        return users
    },

    getOneUserByEmail: async (email: string): Promise<User | undefined> => {
        const userFinded = await prisma.user.findUnique({where: { email }})
        
        if (!userFinded){
            return
        }
        
        return userFinded
    },

    updateUser: (id: string, user: User)=> {

    },

    deleteUser: (id: string)=> {

    }
}