import { RedisCache } from "../databases/redisCache";
import { HttpStatus } from "../domain/enums";
import { AuthenticatedRequest, MiddlewareFunction } from "../domain/types";
import FirebaseAdmin from "../integrations/firebase";

// const authService = new AuthService();

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @returns 
 */
export const authentication: MiddlewareFunction = async (req: AuthenticatedRequest, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(HttpStatus.Unauthorized).end();
    }
    
    FirebaseAdmin.getInstance().getAuth().verifyIdToken(token)
        .then(async (decodedToken) => {
            try {
                const authId = decodedToken.uid;

                if (!authId) {
                    return res.sendStatus(HttpStatus.Unauthorized).end();
                }

                next();
            } catch (error) {
                next(error);
            }   
        })
        .catch((error) => {
            res.sendStatus(HttpStatus.Unauthorized).end();
        })
}