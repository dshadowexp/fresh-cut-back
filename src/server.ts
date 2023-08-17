import { getExpressApplication } from "./app";
import { createServer as createHttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

process.on('uncaughtException', (error) => {
    console.log(error);
    console.error('Uncaught Exception', error);
    process.exit(1);
});

const PORT = process.env.PORT || 3030;

const expressApp = getExpressApplication();
const server = createHttpServer(expressApp);
const ioServer = new SocketServer(server, { cors: { origin: '*' }});

(async () => {
    server.listen(PORT, () => {
        console.debug(`Server ${process.pid}: http://localhost:${PORT}`)
    })
})();

