import { TUser } from "./user.interface";
import { User } from "./user.model";

const findLastUserId = async (role: string) => {

    const lastUser: TUser | null = await User.findOne(
        {
            role: role,
        },
        {
            userId: 1
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastUser?.userId || undefined;
};

const generateFirstWordOfId = (role: string) => {
    return role.trim().split(" ")[0].charAt(0).toUpperCase();
}

export const generateId = async (role: string) => {

    let currentId = "0"

    const lastUserId = await findLastUserId(role);
    currentId = lastUserId ? (Number(lastUserId.substring(3)) + 1).toString() : '1'

    const generateId = `${generateFirstWordOfId(role)}-${currentId.padStart(4, '0')}`;
    return generateId;
};
