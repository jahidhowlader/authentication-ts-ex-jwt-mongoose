import config from "../config";
import { ApiError } from "../errors/ApiError";
import catchAsync from "../utils/catchAsync"
import status from "http-status";
import jwt from 'jsonwebtoken'


const auth = () => {

    return catchAsync(async (request, response, next) => {

        const token = request.headers.authorization;

        if (!token) {
            throw new ApiError(status.UNAUTHORIZED, {
                message: 'You are not authorized!',
                source: 'middleware'

            });
        }

        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {

            if (err) {
                throw new ApiError(status.UNAUTHORIZED, {
                    message: 'You are not authorized!',
                    source: 'middleware'
                });
            }

            console.log(decoded) // bar
            next()
        });
    })
}

export default auth