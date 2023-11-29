import express, {type Express} from 'express';
import './hooks/register.js';
import {afterLoadMiddle, loadMiddle} from './middleware/index.js';
import {loadModule} from './utils/load-module.js';
(async () => {
  const app: Express = express();

  loadMiddle(app);

  loadModule(app);

  afterLoadMiddle(app);

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.log(req);
      console.error(err);
      res.status(500).json({
        message: err.message,
      });
      next();
    },
  );

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
