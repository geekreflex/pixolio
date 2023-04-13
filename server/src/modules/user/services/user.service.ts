import { UserDao, UserDto } from '..';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  public createUser = async (user: UserDto): Promise<string> => {
    const username = this.generateUsername(user.email);
    const newUser = {
      ...user,
      username,
    };
    const userId = this.userDao.createUser(newUser);
    return userId.toString();
  };

  public getAllUsers = async () => {
    const users = await this.userDao.getAllUsers();
    return users;
  };

  private generateUsername(email: string): string {
    const [username] = email.split('@');
    return username;
  }
}
