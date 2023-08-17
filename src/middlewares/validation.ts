import { HttpStatus } from "../domain/enums";
import { MiddlewareFunction } from "../domain/types";
import { errorResponse } from "../utils/responses";
import { validateObjectId } from "../utils/validations";

export const idValidation: MiddlewareFunction = (req, res, next) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(HttpStatus.ValidationError)
            .send(errorResponse(
                HttpStatus.ValidationError,
                'invalid request'
            ));
    }

    next();
}