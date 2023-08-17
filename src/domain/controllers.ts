import { Response } from 'express';
import { AuthenticatedRequest } from './types';


/**
 * 
 * Takes a service type
 */
export interface IDataController<S> {
    dataService: S;
    postHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    getAllHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    getByIdHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    putHandler?: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    patchHandler?: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
}

/**
 * 
 * 
 */
export interface IPaymentController<S> {
    paymentService: S;
    initPaymentHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    authPaymentHandler:  (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    getPaymentMethodsHanlder: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    addPaymentMethodHandler:  (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
    webhookHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
}

/**
 * 
 * 
 */
export interface IExecutionController {
    executeHandler: (req: AuthenticatedRequest, res: Response) => Promise<Response | undefined>;
}