import { Model } from "mongoose";

export type TUserRole = 'admin' | 'user' | 'merchant';
export type TUserStatus = 'active' | 'block';

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
}