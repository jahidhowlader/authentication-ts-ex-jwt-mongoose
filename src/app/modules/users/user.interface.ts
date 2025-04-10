import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = 'active' | 'blocked';
export type TLogin = {
    email: string
    password: string
}

export interface TUser {
    userId: string;
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    isDeleted: boolean;
    status: TUserStatus;
};

// extend TUser for add static method in model
export interface TUserModel extends Model<TUser> {

    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}