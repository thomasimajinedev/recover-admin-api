import jwt from 'jsonwebtoken';
import { User } from '../models';
import config from '../config';

const { secretKey } = config;
class AuthService {
  static generateJWT(user) {
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      secretKey,
    );

    return token;
  }

  static async verifyJWT(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded);
      if (!decoded.user || !decoded.user.email) {
        throw new Error('Invalid token');
      }

      const user = await User.findOne({ email: decoded.user.email });

      if (!user) {
        throw new Error('User is not found in system');
      }

      if (user.status == 'blocked' || user.status == 'deleted') {
        throw new Error('This account is Blocked or Deleted');
      }

      user.userId = user.id;

      return user;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthService;
