import { ApiError } from "../../errors/ApiError"
import { TLogin, TUser, TUserRole } from "./user.interface"
import { User } from "./user.model"
import { generateId } from "./user.utils"
import config from "../../config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import status from "http-status";

const getAllUserFromDB = async (): Promise<TUser[]> => {
    const users = await User.find();
    return users;
};

const createUserIntoDB = async (payload: TUser, role: string): Promise<TUser> => {

    //  Check if the user already exists
    const existingUser = await User.isUserExistsByEmail(payload.email);
    if (existingUser) {
        throw new ApiError(409, {
            source: 'User Creation',
            message: 'A user with this email already exists.',
        });
    }

    //  Generate user ID and assign role
    const userId = await generateId(role);
    const newUser: TUser = {
        ...payload,
        userId,
        role: role as TUserRole,
    };

    // Create the user in the database
    const createdUser = await User.create(newUser);

    return createdUser;
}

const userLoginWithDB = async (payload: TLogin): Promise<string> => {

    const { email, password } = payload;

    //  Check if user exists
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
        throw new ApiError(status.NOT_FOUND, {
            source: 'User Lookup',
            message: 'User not found in the database.',
        });
    }

    // Check if user is deleted
    if (user.isDeleted) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Account Status',
            message: 'User account has been deleted.',
        });
    }

    // Check if user is blocked
    if (user.status === 'blocked') {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Account Status',
            message: 'User account is blocked.',
        });
    }

    //  Verify password
    const isPasswordValid = await User.isPasswordMatched(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Authentication',
            message: 'Incorrect password.',
        });
    }

    // create token with payload data and return access token
    const result = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 60 * 60 });
    return result
}

const updateSingleUserIntoDB = async (decodedData: JwtPayload, paramsEmail: string, body: Partial<TUser>): Promise<TUser | null> => {

    // Check if the user exists
    const user = await User.isUserExistsByEmail(paramsEmail);
    if (!user) {
        throw new ApiError(status.NOT_FOUND, {
            source: 'User Lookup',
            message: 'User not found in the database.',
        });
    }

    // check params email and decoded email are same 
    if (decodedData?.email !== paramsEmail) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Validation Error',
            message: 'User does not match !!'
        });
    }

    //  Filter valid fields to update
    const allowedFields = ['name', 'status', 'isDeleted'] as const;
    const filteredUpdateFields: Partial<TUser> = {};

    for (const key of allowedFields) {
        if (body[key] !== undefined) {
            (filteredUpdateFields[key] as TUser[keyof TUser]) = body[key];
        }
    }

    // Update user in the DB and return the updated document
    const updatedUser = await User.findOneAndUpdate(
        { email: paramsEmail },
        { $set: filteredUpdateFields },
        { new: true, runValidators: true }
        // new: true means By default findOneAndUpdate() return old data new:true mean return new data
        // runValidators: true means By default findOneAndUpdate() do not check validation rules (schema level validation) ## runValidators: true mongoose schema validation enforce 
    );

    return updatedUser;
}

const deleteSingleUserFromDB = async (decodedData: JwtPayload, paramsEmail: string): Promise<TUser | null> => {

    const { email: decodedEmail, role } = decodedData;

    // Check if user exists in the database
    const user = await User.isUserExistsByEmail(paramsEmail);
    if (!user) {
        throw new ApiError(status.NOT_FOUND, {
            source: 'User Lookup',
            message: 'User not found in the database.',
        });
    }

    //  Authorization check (non-admins can only delete themselves)
    const isNotAdminAndMismatch = role !== 'admin' && decodedEmail !== paramsEmail;
    if (isNotAdminAndMismatch) {
        throw new ApiError(status.FORBIDDEN, {
            source: 'Authorization',
            message: 'You are not authorized to delete this user.',
        });
    }

    //  Soft delete the user (mark as deleted)
    const updatedUser = await User.findOneAndUpdate(
        { email: paramsEmail },
        { $set: { isDeleted: true } },
        { new: true }
    );

    return updatedUser
}

export const UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    userLoginWithDB,
    updateSingleUserIntoDB,
    deleteSingleUserFromDB
}