import sha1 from 'sha1';
// eslint-disable-next-line import/no-named-as-default
const { dbClient } = require('../utils/db');

/**
 * UserController class
 * @class
 * @classdesc Class for user controller
 */
class UserController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    console.log(email);
    console.log(password);
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const hashedPassword = sha1(password);
    const user = await dbClient.userCollection().findOne({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });
    const result = await dbClient.userCollection().insertOne({
      email,
      hashedPassword,
    });
    return res.status(201).send({ id: result.insertedId, email });
  }

  static async getMe(req, res) {
    const { user } = req;
    res.stats(200).send({ email: user.email, id: user._id.toString() });
  }
}
export default UserController;

