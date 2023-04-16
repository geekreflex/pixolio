import { Router } from 'express';
import { UserController } from '..';
import { validateResource } from '../../common';
import { CreateUserSchema } from '../schema/create.user.schema';

export class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .route(`/`)
      .get(this.userController.getAllUsers)
      .post(validateResource(CreateUserSchema), this.userController.createUser);
  };
}
