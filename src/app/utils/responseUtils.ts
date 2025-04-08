/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export const responseTime = (requestStartTime: number): string => {
    return `${Date.now() - requestStartTime}ms`;
}

// Generic success response utility function
export const handleSuccessResponse = (request: Request, response: Response, data: any, message: string = 'Operation successful') => {

    const startTime = request.requestStartTime as number;

    return response.status(200).json({
        status: 200,
        success: true,
        responseTime: responseTime(startTime),
        message,
        data,
    });
};