import { ErrorRequestHandler } from 'express'
import { BadRequest } from '../logging/bad-request';
import { NoContent } from '../logging/no-content';
import { HttpCodes } from '../logging/types';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status;
  let code;

  switch (err.constructor) {
    case NoContent:
      status = HttpCodes.NoContent;
      code = -1;
      break;
    case BadRequest:
      status = HttpCodes.BadRequest;
      code = -2;
      break;
    default:
      status = HttpCodes.InternalServerError;
      code = -3;
      break;
  }

  res.status(status).json({
    code: code,
    msg: err,
  })
}
