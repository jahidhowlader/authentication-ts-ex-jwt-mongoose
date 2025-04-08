import { NextFunction, Request, Response } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // minutes
    max: 5, // Limit to requests per windowMs
    handler: (req: Request, res: Response, next: NextFunction, options: Options) => {

        const timeLeftInMinutes = Math.ceil((options.windowMs - (Date.now() % options.windowMs)) / 60000);
        return res.status(options.statusCode).json({
            success: false,
            message: `Status ${options.statusCode}: You have exceeded the maximum number of requests with "${req.originalUrl}"`,
            statusCode: options.statusCode,
            retryAfter: `${timeLeftInMinutes} minutes`,
            ip: req.ip === '::1' ? '127.0.0.1' : req.ip,
            endpoint: req.originalUrl
        });
    }
});

export default rateLimiter