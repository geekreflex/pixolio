import { UserDao, UserDto } from '..';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  public async getAllUsers() {
    const users = await this.userDao.getAllUsers();
    return users;
  }

  public async createUser(resource: UserDto): Promise<string> {
    const userId = this.userDao.createUser(resource);
    return userId.toString();
  }
}
