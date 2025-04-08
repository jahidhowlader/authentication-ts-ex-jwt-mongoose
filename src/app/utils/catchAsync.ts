import { NextFunction, Request, RequestHandler, Response } from "express"

const catchAsync = (fn: RequestHandler) => (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    return Promise.resolve(fn(request, response, next)).catch(next)
}

export default catchAsync