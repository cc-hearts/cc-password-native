import express, { type Express } from 'express';
import './hooks/index.js';
import { afterLoadMiddle, beforeLoadMiddle } from './middleware/index.js';
import { loadModule } from './modules/index.js';
import { getConfig } from './utils/config.js';
(async () => {
  const app: Express = express();

  beforeLoadMiddle(app);

  loadModule(app);

  afterLoadMiddle(app);

  const port = getConfig()?.port || 3000;

  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });
})();
