import { ApiError } from "../../errors/ApiError"
import { TLogin, TUser, TUserRole } from "./user.interface"
import { User } from "./user.model"
import { generateId } from "./user.utils"
import config from "../../config";
import jwt from 'jsonwebtoken'
import status from "http-status";

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

const userLoginWithDB = async (payload: TLogin) => {

    // check user has exist in DB with email
    const user = await User.isUserExistsByEmail(payload.email)
    if (!user) {
        throw new ApiError(status.NOT_FOUND, {
            source: 'Mongoose Error',
            message: 'This user is not found !'
        });
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Mongoose Error',
            message: 'This user is deleted !'
        });
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Mongoose Error',
            message: 'This user is blocked ! !'
        });
    }

    // check Body password and BD password are same
    const checkPasswordMatch = await User.isPasswordMatched(payload?.password, user?.password)
    if (!checkPasswordMatch) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Mongoose Error',
            message: 'Password does not match !!'
        });
    }

    // create token with payload data and return access token
    const result = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 60 * 60 });
    return result
}

const getAllUserFromDB = async () => {

    // Get All user data from DB and return
    const result = await User.find()
    return result
}

const updateSingleUserIntoDB = async (decodedEmail: string, paramsEmail: string, body: Partial<TUser>) => {

    // check params email and decoded email are same 
    if (decodedEmail !== paramsEmail) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Validation Error',
            message: 'User does not match !!'
        });
    }

    // filter data field which is given update 
    const updateUserData = {
        name: body.name,
        status: body.status,
        delete: body.isDeleted
    }

    // User data updated with DB and return new user data
    const result = await User.findOneAndUpdate(
        { email: paramsEmail },
        {
            $set: updateUserData
        },
        { new: true, runValidators: true }
        // new: true means By default findOneAndUpdate() return old data new:true mean return new data
        // runValidators: true means By default findOneAndUpdate() do not check validation rules (schema level validation) ## runValidators: true mongoose schema validation enforce 
    )

    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    userLoginWithDB,
    updateSingleUserIntoDB
}