import { Request, Response } from 'express';
import { UserService } from '..';

export class UserController {
  private userService = new UserService();

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send('Internal server error');
    }
  }
}
