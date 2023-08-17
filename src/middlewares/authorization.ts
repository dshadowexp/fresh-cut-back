import { HttpStatus, UserRole } from "../domain/enums";
import { AuthenticatedRequest, MiddlewareFunction } from "../domain/types";

export const authorization = (authorizedRoles: UserRole[]): MiddlewareFunction => {
    return async (req: AuthenticatedRequest, res, next) => {
        try {
            if (!req.authId || !req.userId || !req.role) {
                return res.sendStatus(HttpStatus.Unauthorized).end();
            }

            if (authorizedRoles.length > 0 && !authorizedRoles.includes(req.role!)) {
                return res.sendStatus(HttpStatus.Forbidden).end();
            }

            next()
        } catch (error) {
            next(error);
        }
    }
}