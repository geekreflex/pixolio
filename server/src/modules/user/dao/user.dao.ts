import { Model, ObjectId } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

export class UserDao {
  private userModel: Model<User>;

  constructor() {
    this.userModel = UserModel;
  }

  public createUser = async (user: UserDto) => {
    const newUser = new this.userModel({ ...user });
    await newUser.save();
    return newUser;
  };

  public getAllUsers = async () => {
    const users = await this.userModel.find().exec();
    return users;
  };

  public getUserById = async (userId: string) => {
    const user = await this.userModel.findById(userId);
    return user;
  };

  public getUserByEmail = async (email: string) => {
    const user = await this.userModel.findOne({ email });
    return user;
  };

  public getUserByEmailWithPassword = async (email: string) => {
    const user = await this.userModel
      .findOne({ email })
      .select('password')
      .exec();
    return user;
  };

  public isUsernameExits = async (username: string): Promise<boolean> => {
    const user = await this.userModel.findOne({ username });
    return !!user;
  };
}
