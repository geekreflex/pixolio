import { Router } from 'express';
import { validateResource } from '../../common';
import { AuthSchema } from '../schema/auth.schema';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
  public router: Router;
  private authMiddleware: AuthMiddleware;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/`,
      validateResource(AuthSchema),
      this.authMiddleware.verifyUserPassword,
      this.authController.login
    );
  }
}
