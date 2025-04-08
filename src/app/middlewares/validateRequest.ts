import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {

    return catchAsync(async (request, response, next) => {
        await schema.parseAsync({
            body: request.body
        })
        next()
    })
}

export default validateRequest