import { Request, Response, NextFunction } from 'express';

export const requestTime = (request: Request, response: Response, next: NextFunction) => {
    request.requestStartTime = Date.now();
    next();
}