import {createRouterFactory} from '../utils/create-router.js';
import {userLogin} from '../modal/user.js';

const {router, setup} = createRouterFactory('/user');
export {setup as UserSetup};

router.post('/auth', async (req, res) => {
  await userLogin(req.body);
  res.send(200);
});
