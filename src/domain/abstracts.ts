import { Queue, Worker, QueueEvents, Job } from "bullmq";
import Redis, { RedisOptions } from "ioredis";
import { QueueEvent } from "./types";
import { IJobData, IJobRun } from "./interfaces";
import { queuesLogger } from "../loggers/winstonLoggers";
import { IDataService } from "./services";
import { Model } from "mongoose";

/********************************************************************* */
/**
 * Queue Definition Worker Function Defintions
 */

export const redisConfig = {
    host: '',
    port: 0,
    password: "",
    url: ""
};

const connectConfig: RedisOptions = {
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    maxRetriesPerRequest: null,
}

export abstract class AbstractQueue {
    private readonly queue: Queue;
    private readonly worker: Worker;
    private readonly events: QueueEvents;

    protected constructor(private queueName: string) {
        this.queue = new Queue(this.queueName, { connection: new Redis( connectConfig ) });
        this.events = new QueueEvents(this.queueName, { connection: new Redis( connectConfig ) });
        this.worker = new Worker(this.queueName, this.handler, { connection: new Redis( connectConfig ) });
        this.logInitialize();
    }

    private handler = async (job: Job<IJobRun>): Promise<void> => {
        await job.data.run();
    }

    public addJob = async <T>(job: IJobData<T>): Promise<void> => {
        await this.queue.add(job.type, job);
    }

    private logInitialize = () => {
        this.events.on('waiting', ({ jobId }: QueueEvent) => {
            queuesLogger.info(`${this.queueName}:queue::waiting::: Job with ID ${jobId}`)
        })

        this.events.on('active', ({ jobId, prev }: QueueEvent) => {
            queuesLogger.info(`${this.queueName}:active:: Job ${jobId}; previous status was ${prev}`)
        })

        this.events.on('completed', ({ jobId, returnvalue }: QueueEvent) => {
            queuesLogger.info(`${this.queueName}:completed:: ${jobId} has completed and returned ${returnvalue}`)
        })

        this.events.on('failed', ({ jobId, failedReason }: QueueEvent) => {
            queuesLogger.info(`${this.queueName}:failed:: ${jobId} has failed with reason ${failedReason}`);
        })

        this.worker.on('drained', () => {
            queuesLogger.info(`${this.queueName}:worker::drained::: no more jobs left`);
        })
        
        this.worker.on('completed', (job, returnvalue) => {
            queuesLogger.info(`${this.queueName}:worker::completed::: job ${job.id} has returned ${returnvalue}`);
        });
        
        this.worker.on('failed', (job, error) => {
            queuesLogger.error(`${this.queueName}:worker:: job (${job}) has failed`, error);
        })
    }
}

/********************************************************************* */
/**
 * Queue Definition Worker Function Defintions
 */

export abstract class AbstractDataService<T> implements IDataService<T> {
    constructor(protected model: Model<T>) {
        this.model = model;
    }

    create = async (data: Partial<T>): Promise<T> => {
        const user = new this.model(data);
        await user.save();
        return user;
    }

    getById = async (id: string): Promise<T | null> => {
        return await this.model.findById(id);
    }

    getOneByAttr = async (attrs: Partial<T>): Promise<T | null> => {
        try {
            return await this.model.findOne(attrs);
        } catch (error) {
            throw new Error(`getOneByAttr: ${this.model} ${error}`);
        }
    }

    getManyByAttr = async (attrs: Partial<T> = {}): Promise<T[]> => {
        try {
            return await this.model.find(attrs);
        } catch (error) {
            throw new Error(`getManyByAttr: ${this.model} ${error}`);
        }
    }

    editById = async (id: string, item: Partial<T>): Promise<T | null> => {
        return await this.model.findByIdAndUpdate(id, item, { new: true });
    }

    delete = async (id: string): Promise<void> => {
        await this.model.findByIdAndDelete(id);
    }
}