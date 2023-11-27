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
  const {username, password} = useBody({});
  if (!username || !password) {
    useThrowServiceError('用户名或密码不能为空');
    return;
  }
  const user = await findUser(username);
  // if user not exist
  if (!user) {
    useThrowServiceError('用不不存在');
    return;
  }
  await userLogin({username, password});
  useSuccessResponse('成功');
});
