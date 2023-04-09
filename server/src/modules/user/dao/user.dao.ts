import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

export class UserDao {
  constructor(private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map((user) => new UserDto(user));
  }
}
