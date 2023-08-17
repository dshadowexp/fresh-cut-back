import { connect } from "mongoose";
import { IConfigurationService } from "../domain/services";

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
            const dbURI = `mongodb://mongo:7i40iGYSDslPFJxMcy4g@containers-us-west-185.railway.app:5815`;
            await connect(dbURI);
            console.debug('MongoDB connected');
            this.isConfigured = true;
        } catch (error) {
            console.error('MongoDB Error', error);
            process.exit(1);
        }
    }
}

