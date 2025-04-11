import config from "../config";
import { AppError } from "../errors/AppError";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import catchAsync from "../utils/catchAsync"
import status from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'

const auth = (...requiredRoles: TUserRole[]) => {

    return catchAsync(async (request, response, next) => {

        const token = request.headers.authorization;
        if (!token) {
            throw new AppError(status.UNAUTHORIZED, 'Custom Error: JWT', 'You are not authorized!');
        }

        // If token will verified then get user data or error which is handled by jwt
        const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload

        // check user has exist in DB with email
        const user = await User.isUserExistsByEmail(decoded?.email)
        if (!user) {
            throw new AppError(status.NOT_FOUND, 'Custom Error', 'This user is not found !');
        }

        // checking if the user is already deleted
        const isDeleted = user?.isDeleted;
        if (isDeleted) {
            throw new AppError(status.FORBIDDEN, 'Custom Error', 'This user is deleted !');
        }

        // checking if the user is blocked
        const userStatus = user?.status;
        if (userStatus === 'blocked') {
            throw new AppError(status.FORBIDDEN, 'Custom Error', 'This user is blocked !!');
        }

        if (!requiredRoles.includes(user?.role)) {
            throw new AppError(
                status.UNAUTHORIZED, 'Custom Error', 'You are not authorized!!');
        }

        request.user = user
        next()
    })
}

export default auth