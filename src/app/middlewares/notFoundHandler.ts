/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { responseTime } from '../utils/responseUtils';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction): void => {

    const startTime = request.requestStartTime as number;

    response.status(404).json({
        responseTime: responseTime(startTime),
        success: false,
        status: 404,
        message: 'not found handler',
        error: {
            path: 'express',
            message: ['404 Page not found']
        },
        stack: '404 Page not found',
    });
    return
};