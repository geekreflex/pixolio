import { UserDao, UserDto } from '..';

export class UserService {
  private userDao = new UserDao();

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userDao.getAllUsers();
    return users;
  }
}
