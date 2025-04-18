export class AppError extends Error {
    public status: number;
    public customError: string;

    constructor(status: number, customError: string, message: string, stack: string = "") {
        // Enrich customError before calling super()
        const enrichedError = AppError.enrichErrorType(customError);

        console.log({ enrichedError });


        // Call super early
        super(message);

        // Set class properties
        this.status = status;
        this.customError = enrichedError;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

        // Proper prototype chaining
        Object.setPrototypeOf(this, AppError.prototype);
    }

    private static enrichErrorType(original: string): string {
        const stackLine = (new Error().stack || '').split('\n')[3];
        const match = stackLine.match(/([^\\/]+):(\d+):\d+$/);

        if (match) {
            const fileName = match[1];
            const lineNumber = match[2];
            return `${original}: ${fileName}; line-${lineNumber}`;
        }

        return original;
    }
}
