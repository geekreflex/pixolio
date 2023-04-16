import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { respond, ResponseCode } from '../../../utils/response';

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (err: any) {
      respond(res, err.errors, 'Error validation', ResponseCode.BAD_REQUEST);
    }
  };
