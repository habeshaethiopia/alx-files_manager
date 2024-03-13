import AppController from '../controllers/AppController';
import userController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import { basicAuth, tokenAuth } from '../Auth/auth';
import { MyError, errResponse } from '../Auth/error';

/**
 * Route for the AppController
 * @param {Express} api
 */
const route = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
  api.post('/users', userController.postNew);
  api.get('/connect', basicAuth, AuthController.getConnect);
  api.get('/disconnect', tokenAuth, AuthController.getDisconnect);
  api.get('/users/me', tokenAuth, userController.getMe);
  api.use((err, req, res, next) => {
    errResponse(
      new MyError(`cannot ${req.method} ${req.url}`, 404),
      req,
      res,
      next,
    );
  });
  api.use(errResponse);
};

export default route;
