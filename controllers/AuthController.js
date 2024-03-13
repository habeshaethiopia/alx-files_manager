import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-named-as-default
import redisClient from '../utils/redis';
/**
 * AuthController class
 * @class
 * @classdesc Class for auth controller
 */
class AuthController {
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, user._id.toString(), 24 * 60 * 60);

    res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const { token } = req;
    const key = `auth_${token}`;
    await redisClient.del(key);
    res.status(204).end();
  }
}
export default AuthController;
