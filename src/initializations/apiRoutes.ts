import { Express, json } from "express";
import { IInitialize } from "../domain/interfaces";
import serverError from "../middlewares/serverError";
import notFound from "../middlewares/notFound";

export class RestAPIRoutes implements IInitialize<Express> {
    isInitialized: boolean;
    private static instance: RestAPIRoutes;

    private constructor() {
        this.isInitialized = false;
    }

    public static getInstance(): RestAPIRoutes {
        if (!RestAPIRoutes.instance) {
            RestAPIRoutes.instance = new RestAPIRoutes();
        }
        return RestAPIRoutes.instance;
    }

    initialize(applicationServer: Express) {
        if (this.isInitialized) {
            return;
        }

        applicationServer.use(json())
        applicationServer.get('/', async (req, res) => {
            res.status(200).send('Try the task thing');
        })

        applicationServer.use(notFound);
        applicationServer.use(serverError);
        this.isInitialized = true;
    }
}