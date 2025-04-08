import { z } from "zod";

const userValidationSchema = z.object({

    body: z.object({

        name: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username will be string"
        })
            .max(15, { message: "Username must be less then 15 characters" })
            .trim(),

        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email will be string"
        })
            .email({ message: "Invalid email format" })
            .trim(),

        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password will be string"
        })
            .min(6, { message: "Password is required" }),

        role: z.enum(['user', 'merchant', 'admin'], { message: "Role must be one of 'user', 'merchant', or 'admin'" })
            .optional()

    }, {
        required_error: 'User Information is require',
        invalid_type_error: "User Information will json"
    })
}, {
    required_error: 'Body Information is require',
    invalid_type_error: "Body Information will json"
})

export const UserValidation = {
    userValidationSchema
}