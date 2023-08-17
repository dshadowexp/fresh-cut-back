import { Request, Response } from 'express';
import { HttpStatus } from '../domain/enums';

const notFound = (req: Request, res: Response) => {
    console.info('Invalid endpoint', req.url);
    res.status(HttpStatus.NotFound).send('We see you');
}

export default notFound