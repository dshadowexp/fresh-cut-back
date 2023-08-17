import { IUser } from "./domains";
import { Money } from "./types";

export type IJobRun = {
    run: () => Promise<void>
}

export interface IJobData<T> extends IJobRun {
    type: string,
    data: T
}

export interface IConfigurationService {
    configure: () => Promise<void>;
    isConfigured: boolean
}

export interface IInitialize<T> {
    initialize: (server: T) => void;
    isInitialized: boolean;
}

export interface INotificationService<T, D> {
    title: string,
    service: IDataService<IUser>,
    prepareTemplate: (data: D) => Promise<T>;
    sendNotification: (userId: string) => void;
}

export interface ICacheService {
    setCacheData: <T>(key: string, data: T) => Promise<void>;
    getCachedData: <T>(key: string) => Promise<T | null>;
}

export interface IDataService<D> {
    create: (data: Partial<D>) => Promise<D>,
    getById: (id: string) =>  Promise<D | null>,
    getOneByAttr: (attr: Partial<D>) => Promise<D | null>
    getManyByAttr: (attr: Partial<D> | {}) => Promise<D[] | null>
    editById: (id: string, data: Partial<D>) =>  Promise<D | null>,
    delete: (id: string) =>  Promise<void>
}

export interface IPaymentProcessor {
    createCustomer: (customerData: Pick<IUser, 'firstName' | 'lastName' | 'email' | 'phone'>) => Promise<string>,
    addMethod: (customerId: string, methodId: any) => Promise<any>
    getMethods: (customerId: string) => Promise<any>
    initPayment: (data: any) => Promise<any>,
    authPayment: (paymentId: string) => Promise<any>,
    setRefund: (paymentId: string) => Promise<void>,
    initTransfer: (customerId: string, money: Money) => Promise<void>
    webhook: (signature: string, body: any) => Promise<void>
}