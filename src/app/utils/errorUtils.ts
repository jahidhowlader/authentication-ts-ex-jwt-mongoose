import { ZodError } from 'zod';
import { NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const handleZodError = (error: ZodError, next: NextFunction) => {
    return next(new ApiError(400, {
        source: 'validation error',
        message: error.errors[0].message
    }));
};

export const handleMongoError = (error: Error, next: NextFunction) => {
    return next(new ApiError(400, {
        source: 'mongoose validation error',
        message: error.message
    }));
};