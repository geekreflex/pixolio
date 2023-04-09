import { Request, Response } from 'express';
import { UserDao, UserDto } from '..';
import { UserModel } from '../models/user.model';

export class UserController {
  private userDao = new UserDao(UserModel);

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userDao.getAllUsers();
      const userDtos = users.map((user) => new UserDto(user));
      res.status(200).json(userDtos);
    } catch (err) {
      res.status(500).send('Internal server error');
    }
  }
}
