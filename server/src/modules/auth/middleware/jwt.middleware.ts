import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../user';
import { ResponseCode, respond } from '../../../utils/response';
import jwt from 'jsonwebtoken';

class JwtMiddleware {
  private userService: UserService;
  private jwtSecret: string = process.env.JWT_SECRET as string;

  constructor() {
    this.userService = new UserService();
  }

  public validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split('');
        if (authorization[0] !== 'Bearer') {
          respond(res, {}, 'Unauthorized', ResponseCode.UNAUTHORIZED);
        } else {
          res.locals.jwt = jwt.verify(authorization[1], this.jwtSecret);
          next();
        }
      } catch (error) {
        respond(res, {}, 'Forbidden', ResponseCode.FORBIDDEN);
      }
    } else {
      respond(res, {}, 'Unauthorized', ResponseCode.UNAUTHORIZED);
    }
  }
}
