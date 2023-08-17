import { Server, Socket } from "socket.io";
import { IInitialize } from "../domain/interfaces";
import { createAdapter } from "@socket.io/redis-adapter";
import { CacheDatabase } from "../databases/redisCache";


export class IOSockets implements IInitialize<Server> {
    isInitialized: boolean;
    private static instance: IOSockets;

    private constructor() {
        this.isInitialized = false;
    }

    public static getInstance(): IOSockets {
        if (!IOSockets.instance) {
            IOSockets.instance = new IOSockets();
        }
        return IOSockets.instance;
    }

    initialize(io: Server) {
        const pubClient = CacheDatabase.getInstance().getClient();
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