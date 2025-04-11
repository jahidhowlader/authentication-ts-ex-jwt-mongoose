import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../types/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

    const errorSources: TErrorSources = {
        path: err.path,
        message: [err.message],
    };

    return {
        status: 400,
        message: 'Invalid ID',
        error: errorSources,
    };
};

export default handleCastError;