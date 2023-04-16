import { Request, Response, NextFunction } from 'express';
import { UserService } from '..';

export class UserMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public isEmailTaken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
}
