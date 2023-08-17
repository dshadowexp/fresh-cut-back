import { Router } from "express";
import { UserRole } from "../../domain/enums";
import { authentication } from "../../middlewares/authentication";
import { authorization } from "../../middlewares/authorization";
import { UsersController } from "./controller";
import asyncTryCatch from "../../middlewares/asyncTryCatch";
import cache from "../../middlewares/cache";
import { idValidation } from "../../middlewares/validation";

const router = Router();

const controller = new UsersController();

router.get('/', authentication, authorization([UserRole.ADMIN]), asyncTryCatch(controller.getAllHandler))

router.get('/profile', authentication, cache, asyncTryCatch(controller.getByIdHandler))

router.post('/', authentication, asyncTryCatch(controller.postHandler))

router.patch('/:id', authentication, idValidation, asyncTryCatch(controller.patchHandler))

router.patch('/role/:id', authentication, authorization([UserRole.ADMIN]), idValidation, asyncTryCatch(controller.patchRoleHandler))

export default router;