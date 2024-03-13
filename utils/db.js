import process from 'process';
import { existsSync, readFileSync } from 'fs';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';

const { MongoClient } = require('mongodb');

/**
 * Loads the appropriate environment variables for an event.
 */
const envLoader = () => {
  const env = process.env.npm_lifecycle_event || 'dev';
  const path = env.includes('test') || env.includes('cover') ? '.env.test' : '.env';

  if (existsSync(path)) {
    const data = readFileSync(path, 'utf-8').trim().split('\n');

    for (const line of data) {
      const delimPosition = line.indexOf('=');
      const variable = line.substring(0, delimPosition);
      const value = line.substring(delimPosition + 1);
      process.env[variable] = value;
    }
  }
};

envLoader();

/**
 * Class for DBClient
 */
class DBClient {
  /**
   * Constructor for DBClient
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${dbName}`;
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.client.connect((err) => {
      if (err) {
        console.error('Failed to connect to MongoDB', err);
        return;
      }
      this.db = this.client.db('dbName');
    });
  }
  /**
   * Check if MongoDB client is connected to the server
   * @returns {boolean}
   */

  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */
  async userCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Get the value of a key in Redis
   * @return {Promise<string>}
   */
  async fileCollection() {
    return this.client.db().collection('files');
  }
}
export const dbClient = new DBClient();
export default dbClient;
