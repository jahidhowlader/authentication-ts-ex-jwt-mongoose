/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../types/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources: TErrorSources = {
        path: '',
        message: [`${extractedMessage} is already exists`],
    };

    return {
        status: 400,
        message: 'Invalid ID',
        error: errorSources,
    };
};

export default handleDuplicateError;