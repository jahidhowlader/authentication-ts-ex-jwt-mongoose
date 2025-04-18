/* eslint-disable no-useless-escape */
import { model, Schema } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser, TUserModel>({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        select: 0,
        // validate: {
        //     validator: function (value) {
        //         // At least one lowercase, one uppercase, one digit, one special char
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
        //     },
        //     message: () =>
        //         'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
        // }
    },
    role: {
        type: String,
        enum: ['user', 'merchant', 'admin']
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    profileImage: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// filter deleted data from bulk
UserSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// filter deleted data from single
UserSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// hash password when user will create
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.BCRIPT_SALT))
    next()
})

// remove password after create user
UserSchema.post('save', async function (doc, next) {
    doc.password = "404"
    next()
})

UserSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// create static method in User model for check user already exists
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password')
};

export const User = model<TUser, TUserModel>('User', UserSchema)