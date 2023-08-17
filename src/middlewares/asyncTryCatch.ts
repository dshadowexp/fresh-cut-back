import { Response } from "express";
import { AuthenticatedRequest, MiddlewareFunction } from "../domain/types";

const asyncTryCatch = (
    controllerHandler: (req: AuthenticatedRequest, res: Response) => void
): MiddlewareFunction => {
    return async (req, res, next) => {
        try {
            await controllerHandler(req, res)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default asyncTryCatch;