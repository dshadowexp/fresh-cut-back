import { Schema, Document, model } from "mongoose";
import { User } from "../../domain/domains";
import { UserRole } from "../../domain/enums";

export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    }, 
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }
}, { timestamps: true });

const UserModel = model('User', userSchema);

export default UserModel;