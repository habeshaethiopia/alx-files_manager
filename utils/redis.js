const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('connect', () => {
      this.connected = true;
    });
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error}`);
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
