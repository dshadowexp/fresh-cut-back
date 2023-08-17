import { connect } from "mongoose";
import { IConfigurationService } from "../domain/services";
import { appLogger } from "../loggers/winstonLoggers";

export class MongoDB implements IConfigurationService {
    isConfigured: boolean;
    private static instance: MongoDB;

    private constructor() {
        this.isConfigured = false;
    }

    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    async configure() {
        if (this.isConfigured) {
            return;
        }

        try {
            const dbURI = process.env.MONGODB_URL as string;
            await connect(dbURI);
            appLogger.debug('MongoDB connected');
            this.isConfigured = true;
        } catch (error) {
            appLogger.error('MongoDB Error', error);
            process.exit(1);
        }
    }
}

