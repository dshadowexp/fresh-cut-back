import { Server, Socket } from "socket.io";
import { IInitialize } from "../domain/interfaces";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisCache } from "../databases/redisCache";

export class SocketsHandler implements IInitialize<Server> {
    isInitialized: boolean;
    private static instance: SocketsHandler;

    private constructor() {
        this.isInitialized = false;
    }

    public static getInstance(): SocketsHandler {
        if (!SocketsHandler.instance) {
            SocketsHandler.instance = new SocketsHandler();
        }
        return SocketsHandler.instance;
    }

    initialize(io: Server) {
        const pubClient = RedisCache.getInstance().getClient();
        const subClient = pubClient.duplicate();
        io.adapter(createAdapter(pubClient, subClient));

        io.on('connection', (socket: Socket) => {
            console.log('socket connected');
            socket.on('disconnect', () => {
                console.log('socket disconnected');
            })
        })
    }
}