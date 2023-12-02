import express, { type Express } from 'express';
import './hooks/register.js';
import { afterLoadMiddle, loadMiddle } from './middleware/index.js';
import { loadModule } from './utils/load-module.js';
import { getConfig } from './utils/config.js';
(async () => {
  const app: Express = express();

  loadMiddle(app);

  loadModule(app);

  afterLoadMiddle(app);

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error(err);
      res.status(500).json({
        message: err.message,
      });
      next();
    },
  );

  let { port } = getConfig()
  port = port || 3000
  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });
})();
