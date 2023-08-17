import { RedisClientOptions, createClient } from 'redis';
import { CACHE_EXPIRATION } from "../domain/consts";
import { ICacheService, IConfigurationService } from '../domain/interfaces';

const redisSocketOptions = {
    host: '',
    port: 5494,
}

const redisClientOptions: RedisClientOptions = {
    url: "",
    username: "",
    password: "",
    socket: redisSocketOptions
}

export class CacheDatabase implements IConfigurationService, ICacheService {
    isConfigured: boolean;
    private static instance: CacheDatabase;
    private client: ReturnType<typeof createClient>;

    private constructor() {
        this.isConfigured = false;
        this.client = createClient(redisClientOptions);
    }

    public static getInstance(): CacheDatabase {
        if (!CacheDatabase.instance) {
            CacheDatabase.instance = new CacheDatabase();
        }
        return CacheDatabase.instance;
    }

    private enforceConfiguration() {
        if (!this.isConfigured) {
            throw new Error('Redis configuration enforcement error');
        }
    }

    getClient() {
        return this.client;
    }

    async configure() {
        if (this.isConfigured) {
            return;
        }

        this.client.on('error', (error: any) => {
            console.error('Redis Client Error', error);
            process.exit(1);
        });
    
        this.client.on('connect', () => {
            this.isConfigured = true;
            console.debug('Redis Client Connected');
        })

        await this.client.connect();
    }

    async setCacheData(key: string, data: any) {
        this.enforceConfiguration();
        const cachedData = JSON.stringify(data);
        this.client.setEx(key, CACHE_EXPIRATION, cachedData);
    }

    async getCachedData<T>(key: string): Promise<T | null> {
        this.enforceConfiguration()
        const cachedData = await this.client.get(key);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        return null;
    }
}