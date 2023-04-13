import { Model, ObjectId } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

export class UserDao {
  private userModel: Model<User>;

  constructor() {
    this.userModel = UserModel;
  }

  public createUser = async (user: UserDto): Promise<ObjectId> => {
    const newUser = new this.userModel({ ...user });
    await newUser.save();
    return newUser._id;
  };

  public getAllUsers = async () => {
    const users = await this.userModel.find().exec();
    return users;
  };
}
