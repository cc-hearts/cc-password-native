import express, {type Express} from 'express';
import {loadModule} from './utils/load-module.js';
import {loadMiddle} from './middleware/index.js';
import './hooks/register.js';
(async () => {
  const app: Express = express();

  loadMiddle(app);

  await loadModule(app);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
