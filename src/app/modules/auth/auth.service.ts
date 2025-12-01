import AppError from "../../utils/appError.js"
import type { IUser } from "./auth.interface.js"
import { User } from "./auth.model.js"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcrypt"

const register = async (payload: IUser) => {
    console.log(payload)
    const { email, password, name, ...rest } = payload
    const isExist = await User.findOne({ email: email })
    if (isExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User ALready exist")
    }

    const hashedPass = await bcrypt.hash(password as string, 10)

    const userData = {
        email,
        password: hashedPass,
        name,
        rest
    }

    const user = await User.create(userData)
    return user

}

export const authServices = {
    register
}