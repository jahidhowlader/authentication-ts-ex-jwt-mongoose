import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
    next(new ApiError(404, {
        source: 'Not Found Error',
        message: `Route "${request.originalUrl}" not found`
    }));
};