import mongoose, { ConnectOptions } from 'mongoose';

export class Database {
  private count = 0;
  private mongooseOptions: ConnectOptions;
  private mongoUri: string = `mongodb://localhost:27017/pixolio-db`;
  private connected = false;

  constructor() {
    this.connectWithRetry();
    this.mongooseOptions = {};
  }

  public connectWithRetry = async (): Promise<void> => {
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
  };
  public disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  };

  public dropDatabase = async (): Promise<void> => {
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped');
  };
}
