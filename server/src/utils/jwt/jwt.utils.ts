import { User } from '../../modules/user';
import jwt from 'jsonwebtoken';

export class JwtUtils {
  private static readonly jwtSecret = process.env.JWT_SECRET || 'weew';

  public static createJWT = (
    user: User
  ): { accessToken: string; refreshToken: string } => {
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  };
}
