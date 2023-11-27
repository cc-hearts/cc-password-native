import {createRouterFactory} from '../utils/create-router.js';
import {useHookFactory} from '../hooks/use-hook-factory.js';
import {findUser, userLogin} from '../modal/user.js';

const {router, setup} = createRouterFactory('/user');
export {setup as UserSetup};

router.post('/auth', async (req, res) => {
  const {useBody, useThrowServiceError, useSuccessResponse} = useHookFactory(
    req,
    res,
  );
  const {username, password} = useBody<{username: string; password: string}>(
    {},
  );
  if (!username || !password) {
    useThrowServiceError('The username or password cannot be empty');
    return;
  }
  const user = await findUser({username});
  // if user not exist
  if (!user) {
    useThrowServiceError('The user does not exist');
    return;
  }
  await userLogin({username, password});
  useSuccessResponse('The login verification is successful');
});

// TODO: 异常的注册
