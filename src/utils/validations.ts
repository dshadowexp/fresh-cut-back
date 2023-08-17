import { Types } from 'mongoose';

export const validateObjectId = (objectId: string) => {
    return Types.ObjectId.isValid(objectId);
} 