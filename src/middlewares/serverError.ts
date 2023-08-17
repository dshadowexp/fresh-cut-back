import { ErrorRequestHandler } from "express";
import { HttpStatus } from "../domain/enums";

const serverError: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    res.sendStatus(HttpStatus.ServerError).end();
}

export default serverError;