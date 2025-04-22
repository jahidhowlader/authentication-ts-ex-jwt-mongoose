import { z } from "zod";
import { UserStatus } from "./user.constant";

const createUserValidationSchema = z.object({

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
            .min(6, { message: "Password must be greater then 6 character" }),

        role: z.enum(
            ['user', 'merchant', 'admin'],
            { message: "Role must be one of 'user', 'merchant', or 'admin'" }
        )
            .optional(),

        profileImage: z.string({
            invalid_type_error: "Profile Image will be string"
        })
            .optional(),
    }, {
        required_error: 'User Information is require',
        invalid_type_error: "User Information will json"
    })
}, {
    required_error: 'Body Information is require',
    invalid_type_error: "Body Information will json"
})

const updateUserValidationSchema = z.object({

    body: z.object({

        name: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username will be string"
        })
            .max(15, { message: "Username must be less then 15 characters" })
            .trim()
            .optional(),

        status: z.enum(
            ['active', 'blocked'],
            { message: "Status must be one of 'active' or 'blocked'" }
        )
            .optional(),

        isDeleted: z.boolean({
            invalid_type_error: 'Is deleted field must be boolean data type'
        })
            .optional()

    }, {
        required_error: 'User Information is require',
        invalid_type_error: "User Information will json"
    })
}, {
    required_error: 'Body Information is require',
    invalid_type_error: "Body Information will json"
})

const loginValidationSchema = z.object({

    body: z.object({

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
            .min(6, { message: "Password is required" })
    })
}, {
    required_error: 'Body Information is require',
    invalid_type_error: "Body Information will json"
})

// const foodprint
const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
});

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
    loginValidationSchema,
    changeStatusValidationSchema
}