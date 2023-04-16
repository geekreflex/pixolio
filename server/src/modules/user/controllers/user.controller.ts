import { Request, Response } from 'express';
import { UserService } from '..';
import { ResponseCode, respond } from '../../../utils/response';
import { JwtUtils } from '../../../utils';
import * as argon2 from 'argon2';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const user = await this.userService.createUser(req.body);
      const token = JwtUtils.createJWT(user);
      respond(res, { token }, '');
    } catch (err) {
      respond(
        res,
        {},
        'Internal server error',
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      respond(res, users, '');
    } catch (err) {
      respond(
        res,
        {},
        'Internal server errror',
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}
