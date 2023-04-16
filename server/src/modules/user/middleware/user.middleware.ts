import { Request, Response, NextFunction } from 'express';
import { UserService } from '..';
import { ResponseCode, respond } from '../../../utils/response';

export class UserMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public checkEmailTaken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.getUserByEmail(req.body.email);
    if (user) {
      respond(res, {}, 'User email already taken', ResponseCode.BAD_REQUEST);
    } else {
      next();
    }
  };
}
