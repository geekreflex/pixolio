import { Router } from 'express';
import { UserController, UserMiddleware } from '..';
import { validateResource } from '../../common';
import { CreateUserSchema } from '../schema/create.user.schema';

export class UserRoute {
  public router: Router;
  private userController: UserController;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .route(`/`)
      .get(this.userController.getAllUsers)
      .post(
        validateResource(CreateUserSchema),
        this.userMiddleware.checkEmailTaken,
        this.userController.createUser
      );
  };
}
