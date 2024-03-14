import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
// eslint-disable-next-line import/no-named-as-default
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');
/**
 * UserController class
 * @class
 * @classdesc Class for user controller
 */
class UserController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const hashedPassword = sha1(password);

    // const user = await dbClient.findUser({ email });
    const user = await dbClient.userCollection().findOne({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });
    // const result = await dbClient.insertionInfo({ email, password: hashedPassword }, 'users');
    const result = await dbClient.userCollection().insertOne({ email, password: hashedPassword });
    userQueue.add({ userId: result.insertedId, email });
    return res.status(201).send({ id: result.insertedId, email });
  }

  static async getMe(req, res) {
    const { user } = req;
    res.stats(200).send({ email: user.email, id: user._id.toString() });
  }
}
export default UserController;
