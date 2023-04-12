import mongoose from 'mongoose';

export class Database {
  private count = 0;
  private mongooseOptions = {};
  private mongoUri: string = `mongodb://localhost:27017/pixolio-db`;
  private connected = false;

  constructor() {
    this.connectWithRetry();
  }

  public async connectWithRetry(): Promise<void> {
    console.log('Attempting MongoDB connection (will retry if needed)');
    try {
      await mongoose.connect(this.mongoUri, this.mongooseOptions);
      this.connected = true;
      console.log('MongoDB is connected');
    } catch (err) {
      const retrySeconds = 5;
      console.log(
        `MongoDB connection unsuccessful (will retry #${++this
          .count} after ${retrySeconds} seconds):`,
        err
      );
      setTimeout(() => {
        if (!this.connected) {
          this.connectWithRetry();
        }
      }, retrySeconds * 1000);
    }
  }
}
