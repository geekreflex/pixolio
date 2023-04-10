import express, { Application } from 'express';

export class App {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    this.app.listen(8080, () => {
      console.log(`Server is running on port 8080`);
    });
  }
}
