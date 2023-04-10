import express, { Application } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/user';

export class App {
  private readonly app: Application;
  private userRoute = new UserRoute();

  constructor() {
    this.app = express();
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

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
