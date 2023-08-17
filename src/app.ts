import express, { Express, urlencoded } from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(urlencoded({ extended: true }))

export const getExpressApplication = (): Express => {
    return app;
}