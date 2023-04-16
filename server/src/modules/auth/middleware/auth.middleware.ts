import { Request, Response, NextFunction } from 'express';
import { User, UserService } from '../../user';
import * as argon2 from 'argon2';
import { respond, ResponseCode } from '../../../utils/response';

export class AuthMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public verifyUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: any = await this.userService.getUserByEmailWithPassword(
      req.body.email
    );
    if (user) {
      const passwordHash = user.password;
      if (await argon2.verify(passwordHash, req.body.pasasword)) {
        req.body = {
          userId: user.id,
          email: user.email,
          username: user.username,
        };
        return next();
      } else {
        respond(
          res,
          {},
          'Invalid email and/or password',
          ResponseCode.BAD_REQUEST
        );
      }
    } else {
      respond(
        res,
        {},
        'Invalid email and/or password',
        ResponseCode.BAD_REQUEST
      );
    }
  };
}
