import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { handleSuccessResponse } from "../../utils/responseUtils";
import { TLogin, TUser } from "./user.interface";
import { UserService } from "./user.service";

const createUser = catchAsync(

    async (request, response) => {
        const userData: TUser = request.body
        const result = await UserService.createUserIntoDB(userData, 'user')
        handleSuccessResponse(request, response, result, 'User create successfully..')
    }
)

const createAdmin = catchAsync(

    async (request, response) => {
        const userData: TUser = request.body
        const result = await UserService.createUserIntoDB(userData, 'admin')
        handleSuccessResponse(request, response, result, 'Admin create successfully..')
    }
)

const createMerchant = catchAsync(

    async (request, response) => {
        const userData: TUser = request.body
        const result = await UserService.createUserIntoDB(userData, 'merchant')
        handleSuccessResponse(request, response, result, 'Merchant create successfully..')
    }
)

const logInUser = catchAsync(

    async (request, response) => {
        const { email, password }: TLogin = request.body
        const credentials = {
            email, password
        }
        const accessToken = await UserService.userLoginWithDB(credentials)
        handleSuccessResponse(request, response, accessToken, 'Login successfully..')
    }
)

const getAllUser = catchAsync(

    async (request, response) => {
        const result = await UserService.getAllUserFromDB()
        handleSuccessResponse(request, response, result, 'User create successfully..')
    }
)

const updateSingleUser = catchAsync(

    async (request, response) => {

        const paramsEmail: string = request.params.email
        const body: Partial<TUser> = request.body

        const result = await UserService.updateSingleUserIntoDB(paramsEmail, body)
        handleSuccessResponse(request, response, result, 'User updated successfully...')
    }
)

const deleteSingleUser = catchAsync(

    async (request, response) => {

        const paramsEmail: string = request.params.email
        const decodedData: JwtPayload = request.user

        const result = await UserService.deleteSingleUserFromDB(decodedData, paramsEmail)
        handleSuccessResponse(request, response, result, 'User deleted successfully...')
    }
)

export const UserController = {
    createUser,
    createAdmin,
    createMerchant,
    logInUser,
    getAllUser,
    updateSingleUser,
    deleteSingleUser
}