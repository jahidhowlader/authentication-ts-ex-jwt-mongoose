import 'express';

declare module 'express' {
    export interface Request {
        requestStartTime?: number;
    }
}