import process from 'process';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';

const { MongoClient } = require('mongodb');

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
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
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
    console.log(await this.client.db().collection('users').findOne({ email: 'bob@dylan.com' }));
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
