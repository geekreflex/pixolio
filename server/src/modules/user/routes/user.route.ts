import { Router } from 'express';
import { UserController } from '..';

export class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.userController.getAllUsers);
  }
}
