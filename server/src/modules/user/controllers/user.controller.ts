import { Request, Response } from 'express';
import { UserService } from '..';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response) {
    try {
      const userId = await this.userService.createUser(req.body);
      res.status(200).json({ id: userId });
    } catch (err) {
      res.status(500).send('Error');
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send('Internal server error');
    }
  }
}
