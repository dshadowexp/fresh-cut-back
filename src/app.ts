import express, { Express, urlencoded } from 'express';
import helmet from 'helmet';
import corsFilter from './middlewares/corsFilter';

const app = express();

app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(corsFilter())

export const getExpressApplication = (): Express => {
    return app;
}