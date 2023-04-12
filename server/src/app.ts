import express, { Application } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/user';
import { Database } from './modules/common';

export class App {
  private readonly app: Application;
  private userRoute: UserRoute;
  private db: Database;

  constructor() {
    this.app = express();
    this.db = new Database();
    this.userRoute = new UserRoute();

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeRoutes() {
    this.app.use(`/users`, this.userRoute.router);
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
