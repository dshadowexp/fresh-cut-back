import { Response } from 'express';
import { AuthenticatedRequest } from "../../domain/types";
import { UsersService } from "./service";
import * as Validation from "./validation";
import { HttpStatus } from '../../domain/enums';
import { errorResponse, successResponse } from '../../utils/responses';
import { RedisCache } from '../../databases/redisCache';
import { IDataController } from '../../domain/controllers';

/**
 *  
 * 
 */
export class UsersController implements IDataController<UsersService> {
    dataService: UsersService;

    constructor() {
        this.dataService = new UsersService();
    }

    postHandler = async (req: AuthenticatedRequest, res: Response) => {
        // validate request body
        // return validation error if failed
        const { error } = Validation.validateCreateUserInput(req.body);
        if (error) {
            return res
                .status(HttpStatus.ValidationError)
                .send(errorResponse(
                    HttpStatus.ValidationError,
                    error.details[0].message
                ));
        }
            
        // check if user resource exists
        // return a conflict status if user exists
        if ( (await this.dataService.getOneByAttr({ email: req.body.email })) ) {
            return res
                .status(HttpStatus.Conflict)
                .send(errorResponse(
                    HttpStatus.Conflict,
                    'account for user already exists'
                ));
        }
        
        // create new user
        const user = await this.dataService.create(req.body);

        // create internal user resource auth mapping
        // await AuthQueue.createAuthMapping( user._id, req.authId! );

        // create a new stripe user mapped to user resource
        // await PaymentQueue.createPaymentCustomer( user._id );

        // return user payload
        res.status(HttpStatus.Created)
            .send(successResponse(
                HttpStatus.Created,
                user
            ));
    };

    getAllHandler = async (req: AuthenticatedRequest, res: Response) => {
        const users = await this.dataService.getManyByAttr();
        return res.status(HttpStatus.Ok)
            .send(successResponse(
                HttpStatus.Ok, 
                users
            ))
    }

    getByIdHandler = async (req: AuthenticatedRequest, res: Response) => {
        // check if user profile resource is extant
        const user = await this.dataService.getById(req.userId!);
        if (!user) {
            return res.status(HttpStatus.NotFound)
                .send(errorResponse( HttpStatus.NotFound ));
        }

        // cache user profile
        RedisCache.getInstance().setCacheData(req.originalUrl, user);
        
        // return user profile payload
        res.status(HttpStatus.Ok)
            .send(successResponse(
                HttpStatus.Ok,
                user
            ));
    }

    patchHandler = async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;

        // validate request body
        // return validation error if failed
        const { error } = Validation.validateUpdateUserInput(req.body);
        if (error) {
            return res
                .status(HttpStatus.ValidationError)
                .send(errorResponse(
                    HttpStatus.ValidationError,
                    error.details[0].message
                ));
        }

        // check if user exists
        // return status not found if user resource absent
        const user = await this.dataService.getById(id);
        if (!user) {
            return res.status(HttpStatus.NotFound)
                .send(errorResponse(
                    HttpStatus.NotFound
                ))
        }

        if (!user._id.equals(req.userId)) {
            return res.status(HttpStatus.Forbidden)
                .send(errorResponse(
                    HttpStatus.Forbidden
                ))
        } 

        // update user resource with validate request body
        const updateUser = await this.dataService.editById(id, req.body);

        // update user resource in cache
        RedisCache.getInstance().setCacheData(req.originalUrl, updateUser);

        // queue update stripe customer resource with updated values 
        // TODO: 

        // return updated user payload
        res.status(HttpStatus.Ok)
            .send(successResponse(
                HttpStatus.Ok,
                updateUser
            ));
    }

    patchRoleHandler = async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
    
        // validate request body
        // return validation error if failed
        const { error } = Validation.validateUpdateUserRoleObject(req.body);
        if (error) {
            return res
                .status(HttpStatus.ValidationError)
                .send(errorResponse(
                    HttpStatus.ValidationError,
                    error.details[0].message
                ));
        }
    
        // check if user exists
        // return status not found if user resource absent
        const user = await this.dataService.getById(id);
        if (!user) {
            return res.status(HttpStatus.NotFound)
                .send(errorResponse(
                    HttpStatus.NotFound
                ))
        }
    
        // update user role by the given id
        const updateUser = await this.dataService.editById(id, req.body);
    
        // update the user role in the auth mapping resource
        // await AuthQueue.updateAuthMappingRole(id, updateUser?.role!);
        
        // return updated user payload
        res.status(HttpStatus.Ok)
            .send(successResponse(
                HttpStatus.Ok,
                updateUser
            ))
    }
} 
