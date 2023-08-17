import dotenv from 'dotenv';
dotenv.config();

import express, { Express, urlencoded } from 'express';
import helmet from 'helmet';
import corsFilter from './middlewares/corsFilter';
import morganLogger from './loggers/morganLogger';

const app = express();

app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(corsFilter())
app.use(morganLogger())

export const getExpressApplication = (): Express => {
    return app;
}