import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/user';
import { Database } from './modules/common';
import { AuthRoutes } from './modules/auth/routes/auth.route';

export class App {
  private readonly app: Application;
  private userRoute: UserRoute;
  private authRoute: AuthRoutes;
  private db: Database;

  constructor() {
    this.app = express();
    this.db = new Database();
    this.userRoute = new UserRoute();
    this.authRoute = new AuthRoutes();

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeRoutes() {
    this.app.use(`/v1/auth`, this.authRoute.router);
    this.app.use(`/v1/users`, this.userRoute.router);
  }

  public async start(port: number): Promise<void> {
    try {
      this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      this.db.connectWithRetry();
    } catch (error) {
      console.error('Error');
    }
  }
}
