import config from "../config";
import { ApiError } from "../errors/ApiError";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import catchAsync from "../utils/catchAsync"
import status from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'


const auth = (...requiredRoles: TUserRole[]) => {

    return catchAsync(async (request, response, next) => {

        const token = request.headers.authorization;

        if (!token) {
            throw new ApiError(status.UNAUTHORIZED, {
                message: 'You are not authorized!',
                source: 'middleware'

            });
        }

        // If token will verified then get user data or error which is handled by jwt
        const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload

        // check user has exist in DB with email
        const user = await User.isUserExistsByEmail(decoded?.email)
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

        if (requiredRoles && !requiredRoles.includes(user?.role)) {
            throw new ApiError(
                status.UNAUTHORIZED,
                {
                    source: 'JWT Error',
                    message: 'You are not authorized!!'
                }
            );
        }

        request.user = decoded
        next()
    })
}

export default auth