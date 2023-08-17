export type IJobRun = {
    run: () => Promise<void>
}

export interface IJobData<T> extends IJobRun {
    type: string,
    data: T
}

export interface IInitialize<T> {
    initialize: (server: T) => void;
    isInitialized: boolean;
}
