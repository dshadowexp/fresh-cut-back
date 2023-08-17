import { Schema, Document, model } from 'mongoose';
import { UserRole } from '../../domain/enums';
import { Auth } from '../../domain/domains';

export interface AuthMappingDocument extends Auth, Document {}

const authMappingSchema = new Schema<AuthMappingDocument>({
    authId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    }
});

const AuthMappingModel = model('AuthMapping', authMappingSchema);

export default AuthMappingModel;