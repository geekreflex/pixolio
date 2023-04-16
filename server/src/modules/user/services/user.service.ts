import { UserDao, UserDto } from '..';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  public createUser = async (resource: UserDto) => {
    const username = this.generateUsername(resource.email);
    const newUser = {
      ...resource,
      username,
    };
    const user = await this.userDao.createUser(newUser);
    return user;
  };

  public getAllUsers = async () => {
    const users = await this.userDao.getAllUsers();
    return users;
  };

  public getUserById = async (userId: string) => {
    const user = await this.userDao.getUserById(userId);
    return user;
  };

  public getUserByEmail = async (email: string) => {
    const user = await this.userDao.getUserByEmail(email);
    return user;
  };

  public getUserByEmailWithPassword = async (email: string) => {
    const user = await this.userDao.getUserByEmailWithPassword(email);
    return user;
  };

  private generateUsername(email: string): string {
    const [username] = email.split('@');
    return username;
  }
}
