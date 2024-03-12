import process from 'process';

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.db = new MongoClient(url, { useUnifiedTopology: true });
    this.db.connect((err) => {
      if (err) console.log(err);
      else console.log('Connection to DB established');
    });
  }

  isAlive() {
    return this.db.isConnected();
  }

  nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}
const dbClient = new DBClient();
export default dbClient;
