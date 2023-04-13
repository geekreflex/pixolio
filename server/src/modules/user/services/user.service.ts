import { UserDao, UserDto } from '..';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  public getAllUsers = async () => {
    const users = await this.userDao.getAllUsers();
    return users;
  };

  public createUser = async (resource: UserDto): Promise<string> => {
    const userId = this.userDao.createUser(resource);
    return userId.toString();
  };
}
