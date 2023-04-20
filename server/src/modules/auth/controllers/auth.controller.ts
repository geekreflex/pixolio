import { Request, Response } from 'express';
import { JwtUtils } from '..';
import { ResponseCode, respond } from '../../../utils/response';

export class AuthController {
  public login = async (req: Request, res: Response) => {
    try {
      const token = JwtUtils.createJWT(req.body);
      respond(res, { token }, '');
    } catch (error) {
      respond(
        res,
        {},
        'Internal server error',
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}
