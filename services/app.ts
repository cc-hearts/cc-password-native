import express, {type Express} from 'express';
import {loadModule} from './utils/load-module.js';

(async () => {
  const app: Express = express();
  await loadModule(app);
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
