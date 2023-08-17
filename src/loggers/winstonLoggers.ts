import { createLogger, transports, format } from "winston";
const { combine, colorize, timestamp, errors, printf } = format;

const levels = {
    trace: 0,
    input: 1,
    verbose: 2,
    prompt: 3,
    debug: 4,
    info: 5,
    data: 6,
    help: 7,
    warn: 8,
    error: 9
};

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
};

const combinedFormat = combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss A' }),
    colorize({ colors }),
    errors({ stack: true }),
    printf(info => {
        const code = /\u001b\[(\d+(;\d+)*)?m/g;
        let logMessage = `${info.timestamp} ${info.service} ${info.level}: ${(info.message)}`;
        logMessage = logMessage.replace(code, '')
        return logMessage;
    })
);

export const appLogger = createLogger({
    level: level(),
    levels,
    defaultMeta: { service: 'app-server' },
    format: combinedFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ]
})

export const queuesLogger = createLogger({
    defaultMeta: { service: 'queues-service' },
    format: combinedFormat,
    transports: [
        new transports.Console(),
    ]
})

export const usersLogger = createLogger({
    defaultMeta: { service: 'users-service' },
    format: combinedFormat,
    transports: [
        new transports.Console(),
    ]
})

export const paymentsLogger = createLogger({
    levels,
    defaultMeta: { service: 'payments-service' },
    format: combinedFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/payments_error.log',
            level: 'error',
        }),
    ]
})

export const queueLogger = createLogger({
    level: level(),
    levels,
    defaultMeta: { service: 'tasks-queue' },
    format: combinedFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ]
})