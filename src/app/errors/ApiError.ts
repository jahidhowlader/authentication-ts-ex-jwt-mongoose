export class ApiError extends Error {
    statusCode: number;
    errorDetails: {
        source: string
        message: string
    };

    constructor(statusCode: number, errorDetails: { source: string, message: string }) {
        super(errorDetails.message);

        this.statusCode = statusCode;
        this.errorDetails = errorDetails;

        // Maintaining proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        // Setting the prototype explicitly (for proper inheritance in TypeScript)
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}