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

  public checkUserExistByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.getUserByUsername(req.params.username);
    if (user) {
      next();
    } else {
      respond(res, {}, 'User not found', ResponseCode.NOT_FOUND);
    }
  };
}
