import { HttpStatus } from "../domain/enums";
import { ApiResponse } from "../domain/types";
import { HttpStatusData, httpStatusMap } from "./http";

/**
 * @desc    Send any success response
 *
 * @param   {HttpStatusEnum} statusCode
 * @param   {object | array} data
 */
export const successResponse = <T>(
    statusCode: HttpStatus, 
    results?: T,
): ApiResponse<T> => {
    const { message, code } = httpStatusMap[statusCode] as HttpStatusData;
    
    return {
        message,
        error: false,
        code,
        results,
        timestamp: new Date()
    };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} replaceMessage
 * @param   {number} statusCode
 */
export const errorResponse = (
    statusCode: HttpStatus, 
    replaceMessage?: string
): ApiResponse => {
    const { message, code } = httpStatusMap[statusCode] as HttpStatusData;
    
    return {
        message: replaceMessage ? replaceMessage : message,
        code,
        error: true,
        timestamp: new Date()
    };
};