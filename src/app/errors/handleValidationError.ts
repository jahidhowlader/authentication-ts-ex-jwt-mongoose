import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../types/error';


const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorSources: TErrorSources = {
        path: 'Mongoose',
        message: Object.values(error.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => val.message)
    };

    return {
        status: 400,
        message: 'Validation Error',
        error: errorSources
    };
};

export default handleValidationError;