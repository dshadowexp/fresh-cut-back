import { UserRole } from "./enums";

export interface Auth {
    authId: string,
    userId: string,
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