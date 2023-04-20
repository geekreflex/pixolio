import { Router } from 'express';
import { UserController, UserMiddleware } from '..';
import { validateResource } from '../../common';
import { CreateUserSchema, UpdateUserSchema } from '../schema';
import { JwtMiddleware } from '../../auth';

export class UserRoute {
  public router: Router;
  private userController: UserController;
  private userMiddleware: UserMiddleware;
  private jwtMiddleware: JwtMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.jwtMiddleware = new JwtMiddleware();
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

    this.router
      .route(`/:username/username`)
      .all(this.userMiddleware.checkUserExistsByUsername)
      .get(this.userController.getUserByUsername);

    this.router
      .route(`/:userId/id`)
      .all(this.jwtMiddleware.validJWTNeeded)
      .put(
        validateResource(UpdateUserSchema),
        this.userController.updateUserById
      );
  };
}
