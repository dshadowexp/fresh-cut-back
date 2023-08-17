import { HttpStatus } from "../domain/enums";

export type HttpStatusData = {
  code: number,
  message: string
}

type HttpStatusList = Partial<Record<HttpStatus, HttpStatusData>>;

export const httpStatusMap: HttpStatusList = {
    [HttpStatus.Ok]: {
      code: 200,
      message: "ok"
    },
    [HttpStatus.Created]: {
      code: 201,
      message: "created"
    },
    [HttpStatus.NoContent]: {
      code: 204,
      message: "no content"
    },
    [HttpStatus.BadRequest]: {
      code: 400,
      message: "bad request"
    },
    [HttpStatus.Forbidden]: {
      code: 401,
      message: "forbidden"
    },
    [HttpStatus.Unauthorized]: {
      code: 403,
      message: "unauthorized"
    },
    [HttpStatus.NotFound]: {
      code: 404,
      message: "not found"
    },
    [HttpStatus.Conflict]: {
      code: 409,
      message: "resource conflict"
    },
    [HttpStatus.ValidationError]: {
      code: 422,
      message: "validation error"
    },
    [HttpStatus.ServerError]: {
      code: 500,
      message: "internal server error"
    }
  };