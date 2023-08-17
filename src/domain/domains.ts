import { UserRole } from "./enums";
import { ModelId } from "./types";

export interface Auth {
    authId: string,
    userId: ModelId,
    role: UserRole
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    photo: string,
    role: UserRole
}