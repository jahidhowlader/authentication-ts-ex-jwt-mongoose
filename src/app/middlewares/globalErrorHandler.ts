/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { responseTime } from '../utils/responseUtils';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../types/error';
import { AppError } from '../errors/AppError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

export const globalErrorHandler: ErrorRequestHandler = (error: any, request: Request, response: Response, next: NextFunction): void => {

    const startTime = request.requestStartTime as number;

    let statusCode = error.status || 500
    let message = error.message || 'something went wrong'
    let errorSources: TErrorSources = {
        path: '',
        message: ['something went wrong']
    }

    // Zod Errors
    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.status
        message = simplifiedError.message
        errorSources = simplifiedError.error
    }
    // Mongoose Validation Error
    else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.status
        message = simplifiedError.message
        errorSources = simplifiedError.error
    }
    // Mongoose CastError
    else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError?.status;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.error;
    }
    // Mongoose Cost Error
    else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError?.status;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.error;
    }
    // Custom App error
    else if (error instanceof AppError) {
        message = error?.customError;
        errorSources = {
            path: 'APP',
            message: [error?.message],
        };
    }
    // Error Instance
    else if (error instanceof Error) {
        errorSources = {
            path: 'Server',
            message: [error?.message],
        };
    }

    response.status(statusCode).json({
        responseTime: responseTime(startTime),
        success: false,
        status: statusCode,
        message,
        error: errorSources,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
    return
};