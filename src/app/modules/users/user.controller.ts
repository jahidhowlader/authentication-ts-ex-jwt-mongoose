import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { handleSuccessResponse } from "../../utils/responseUtils";
import { TUser } from "./user.interface";
import { UserService } from "./user.service";
import jwt from 'jsonwebtoken'

const createUser = catchAsync(async (request, response) => {

    const userData: TUser = request.body
    const result = await UserService.createUserIntoDB(userData, 'user')
    handleSuccessResponse(request, response, result, 'User create successfully..')
})

const createAdmin = catchAsync(async (request, response) => {

    const userData: TUser = request.body
    const result = await UserService.createUserIntoDB(userData, 'admin')
    handleSuccessResponse(request, response, result, 'Admin create successfully..')
})

const createMerchant = catchAsync(async (request, response) => {

    const userData: TUser = request.body
    const result = await UserService.createUserIntoDB(userData, 'merchant')
    handleSuccessResponse(request, response, result, 'Merchant create successfully..')
})

const logInUser = catchAsync(async (request, response) => {

    const { email, password }: { email: string, password: string } = request.body
    const credentials = {
        email, password
    }
    const accessToken = jwt.sign(credentials, config.JWT_SECRET, { expiresIn: 60 * 60 });
    handleSuccessResponse(request, response, accessToken, 'Login successfully..')
})

export const UserController = {
    createUser,
    createAdmin,
    createMerchant,
    logInUser
}