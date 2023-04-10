import { Model } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

export class UserDao {
  private readonly userModel: Model<User> = UserModel;

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map((user) => new UserDto(user));
  }
}
