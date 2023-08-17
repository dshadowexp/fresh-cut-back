import { UserRole } from "./enums"

export interface IUser {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    photo: string,
    language: string
    role: UserRole
}