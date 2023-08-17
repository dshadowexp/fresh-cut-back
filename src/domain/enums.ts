export enum HttpStatus {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Forbidden = 401,
    Unauthorized = 403,
    NotFound = 404,
    Conflict = 409,
    ValidationError = 422,
    ServerError = 500
}

export enum JobState {
    QUEUED = 'queued',
    RUNNING = 'running',
    COMPLETED = 'completed'
}

export enum NotificationAgent {
    EMAIL = 'email',
    SMS = 'sms',
    APP = 'inapp'
}

export enum UserRole {
    ADMIN = 'admin',
    BARBER = 'barber',
    GUEST = 'guest',
    USER = 'user'
}

export enum Currency {
    USD = 'usd',
    CAD = 'cad',
    EUR = 'eur'
}