import process from 'process';

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
    this.db = new MongoClient(url, { useUnifiedTopology: true });
    this.db.connect();
  }
  /**
   * Check if MongoDB client is connected to the server
   * @returns {boolean}
   */

  isAlive() {
    return this.db.isConnected();
  }
  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */

  nbUsers() {
    return this.db.collection('users').countDocuments();
  }
  /**
   * Get the value of a key in Redis
   * @param {string} key
   * @returns {Promise<string>}
   */

  nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}
export const dbClient = new DBClient();
export default dbClient;
