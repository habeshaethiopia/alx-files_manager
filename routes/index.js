import AppController from '../controllers/AppController';
import userController from '../controllers/UserController';

/**
 * Route for the AppController
 * @param {Express} api
 */
const route = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
  api.post('/users', userController.postNew);
};

export default route;
