import { getExpressApplication } from "./app";
import { createServer as createHttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { RedisCache } from "./databases/redisCache";
import { MongoDB } from "./databases/mongoDB";
import { RestAPIRoutes } from "./initializations/apiRoutes";
import { SocketsHandler } from "./initializations/socketHandlers";
import { appLogger } from "./loggers/winstonLoggers";

process.on('uncaughtException', (error) => {
    appLogger.error('Uncaught Exception', error);
    process.exit(1);
});

const PORT = process.env.PORT || 3030;

const application = getExpressApplication();
const server = createHttpServer(application);
const socketServer = new IOServer(server, { cors: { origin: '*' }});

(async () => {
    await RedisCache.getInstance().configure();
    await MongoDB.getInstance().configure();
    
    RestAPIRoutes.getInstance().initialize(application);
    SocketsHandler.getInstance().initialize(socketServer);
    
    server.listen(PORT, () => {
        appLogger.debug(`Server ${process.pid}: http://localhost:${PORT}`);
    })
})();

