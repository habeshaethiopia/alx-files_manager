/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * AppController class
 */
class AppController {
  /**
   * Check the status of the API
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} res
   */
  static getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    return res.status(200).send({ redis, db });
  }

  /**
   * Get the stats of the API
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} res
   */
  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.status(200).send({ users, files });
  }
}
export default AppController;
