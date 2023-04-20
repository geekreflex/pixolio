import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../user';
import { ResponseCode, respond } from '../../../utils/response';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class JwtMiddleware {
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

  public validRefreshNeeded = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.getUserByEmailWithPassword(
      res.locals.jwt.email
    );

    const salt = crypto.createSecretKey(
      Buffer.from(res.locals.jwt.refreshKey.data)
    );
    const hash = crypto
      .createHmac('sha512', salt)
      .update(res.locals.jwt.id + this.jwtSecret)
      .digest('base64');

    if (hash === req.body.refreshToken) {
      req.body = {
        id: user?.id,
        email: user?.email,
      };
      return next();
    } else {
      respond(res, {}, 'Invalid refresh token', ResponseCode.BAD_REQUEST);
    }
  };
}
