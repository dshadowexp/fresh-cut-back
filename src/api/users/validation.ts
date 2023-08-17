import Joi from "joi";
import { UserRole } from "../../domain/enums";

const createUserValidationObject = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(''),
    photo: Joi.string().allow(''),
});

const updateUserValidationObject = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    photo: Joi.string()
});

const updateUserRoleValidationObject = Joi.object({
    role: Joi.string().valid(...Object.values(UserRole)).required(),
});

export const validateCreateUserInput = (
    createUserInput: any
): Joi.ValidationResult => {
    return createUserValidationObject
        .validate(createUserInput);
}

export const validateUpdateUserInput = (
    updateUserInput: any
): Joi.ValidationResult => {
    return updateUserValidationObject
        .validate(updateUserInput);
}

export const validateUpdateUserRoleObject = (
    updateUserRoleInput: any
): Joi.ValidationResult => {
    return updateUserRoleValidationObject
        .validate(updateUserRoleInput);
}