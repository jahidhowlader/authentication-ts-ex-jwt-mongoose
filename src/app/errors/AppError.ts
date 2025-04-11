export class AppError extends Error {

    public status: number;
    public customError: string

    constructor(status: number, customError: string, message: string, stack: string = "") {

        super(message);
        this.status = status;
        this.customError = customError

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }

        // Setting the prototype explicitly (for proper inheritance in TypeScript)
        Object.setPrototypeOf(this, AppError.prototype);
    }
}