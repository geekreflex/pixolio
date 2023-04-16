import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/user';
import { Database } from './modules/common';
import { AuthRoutes } from './modules/auth/routes/auth.route';

export class App {
  private readonly app: Application;
  private userRoute: UserRoute;
  private authRoute: AuthRoutes;

  constructor() {
    this.app = express();
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
    const db = new Database();
    db.connectWithRetry().then(() => {
      this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });

    process.on('SIGINT', async () => {
      await db.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await db.disconnect();
      process.exit(0);
    });
  }
}
