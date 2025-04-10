import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            requestStartTime?: number; // Add startTime property to Request
            user: JwtPayload;
        }
    }
}