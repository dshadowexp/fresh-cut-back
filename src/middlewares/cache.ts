import { RedisCache } from "../databases/redisCache";
import { HttpStatus } from "../domain/enums";
import { MiddlewareFunction } from "../domain/types";
import { appLogger } from "../loggers/winstonLoggers";
import { successResponse } from "../utils/responses";

const cache: MiddlewareFunction = async (req, res, next) => {
    const cacheKey = req.originalUrl;

    try {
        const cachedData =  await RedisCache.getInstance().getCachedData<any>(cacheKey);
        
        if (cachedData) {
            return res.status(HttpStatus.Ok)
                .send(successResponse(
                    HttpStatus.Ok,
                    cachedData
                ));
        }
    } catch (error) {
        appLogger.error('cacheMiddleware', error);
    }

    next();
}

export default cache;