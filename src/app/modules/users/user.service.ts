import { ApiError } from "../../errors/ApiError"
import { TUser, TUserRole } from "./user.interface"
import { User } from "./user.model"
import { generateId } from "./user.utils"

const createUserIntoDB = async (payload: TUser, role: string) => {

    // create new object based on payload
    const newUser = { ...payload }
    // check user has exist in DB with email
    const user = await User.isUserExistsByEmail(payload.email)

    // If user has exist then throw error
    if (user) {
        throw new ApiError(409, {
            source: 'Mongoose Error',
            message: "User has already exist..."
        })
    }

    // Add ID number and role in newUser
    newUser.userId = await generateId(role)
    newUser.role = role as TUserRole

    // create user in DB and return
    const result = await User.create(newUser)
    return result
}

export const UserService = {
    createUserIntoDB
}