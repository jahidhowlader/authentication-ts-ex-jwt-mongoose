import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../types/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {

    const errorSource: TErrorSources = {
        path: 'Zod',
        message: error.issues.map((issue: ZodIssue) => {

            if (issue.code === 'invalid_type') {
                return `${issue.message}, expected ${issue.expected} but received ${issue.received}`
            }
            return issue.message
        })
    }

    return {
        status: 400,
        message: 'Validation Error',
        error: errorSource
    };
};

export default handleZodError;