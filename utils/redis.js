import { promisify } from 'util';

const redis = require('redis');
/**
 * Class for RedisClient
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = true;

    this.client.on('error', (error) => {
      this.connected = false;
      console.log(`Redis client not connected to the server: ${error}`);
    });

    this.client.on('connect', () => {
      this.connected = true;
    });
  }
  /**
   * Check if Redis client is connected to the server
   * @returns {boolean}
   */

  isAlive() {
    return this.connected;
  }

  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */
  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  /**
   * Set the value of a key in Redis
   * @param {string} key the key to set
   * @param {string |number | Boolean} value item to store
   * @param {number} duration expiration time in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.set).bind(this.client)(
      key,
      value,
      'EX',
      duration,
    );
  }

  /**
   * Delete a key in Redis
   * @param {string} key
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }
}
export const redisClient = new RedisClient();
export default redisClient;
