import AppController from '../controllers/AppController';

/**
 * Route for the AppController
 * @param {Express} api
 */
const route = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};
export default route;
