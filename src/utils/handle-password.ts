
import bcrypt from "bcrypt"

export const hashPassword = async (password: string, saltRounds: number): Promise<string>=> {
    const passwordEncrypt = await bcrypt.hash(password, saltRounds)
    return passwordEncrypt
}

export const verifyPassword = async (password: string, passwordEncrypt: string): Promise<boolean>=> {
    return await bcrypt.compare(password, passwordEncrypt)
}