import AppController from '../controllers/AppController';
import userController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FileController';
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
  api.post('/files', tokenAuth, FilesController.postUpload);
  api.get('/files/:id', tokenAuth, FilesController.getShow);
  api.get('/files', tokenAuth, FilesController.getIndex);
  api.put('/files/:id/publish', tokenAuth, FilesController.putPublish);
  api.put('/files/:id/unpublish', tokenAuth, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);

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
