import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

// Create winston logger instance
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

// Express middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip === '::1' ? '127.0.0.1' : req.ip;
    logger.info(`${req.method} ${req.originalUrl} - ${ip}`);
    next();
};