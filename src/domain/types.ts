import { NextFunction, Response, Request } from "express"
import { Currency, UserRole } from "./enums"

export type AuthenticatedRequest = Request & {
    authId?: string | null,
    userId?: string | null,
    role?: UserRole | null,
}

export type MiddlewareFunction = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => void

export type ApiResponse<T = undefined> = {
    code: number,
    message: string,
    error: boolean,
    results?: T,
    timestamp: Date
}

export type QueueEvent = {
    jobId: string
    delay?: number
    data?: string
    returnvalue?: string
    prev?: string
    failedReason?: string
}

export type Notification = {
    id: string,
    title: string,
    message: string,
    timeStamp: Date,
    recipients: string[],
    isRead: boolean,
    metadata?: Record<string, any>
}

export type Money = {
    amount: string,
    currency: Currency
}

export type LatLng = {
    lat: number,
    lng: number
}