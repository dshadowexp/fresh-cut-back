import { HttpStatus } from "../domain/enums";
import { MiddlewareFunction } from "../domain/types";

const ipWhitelist = (allowedIPs: string[]): MiddlewareFunction => {
    return async (req, res, next) => {
        const clientIP = req.ip;

        if (allowedIPs.includes(clientIP)) {
            next();
        } else {
            res.sendStatus(HttpStatus.Forbidden).end();
        }
    }
}

export default ipWhitelist;