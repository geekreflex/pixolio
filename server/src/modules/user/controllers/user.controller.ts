import { Request, Response } from 'express';
import { UserService } from '..';
import { ResponseCode, respond } from '../../../utils/response';
import { JwtUtils } from '../../../utils';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);
      const token = JwtUtils.createJWT(user);
      respond(res, { user, token }, '');
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
      res.status(200).json(users);
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
