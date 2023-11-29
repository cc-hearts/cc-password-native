import { profileKey } from '../config/index.js';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import { setWhiteRouter } from '../middleware/auth-guard.js';
import { findUser, userLogin } from '../modal/user.js';
import { createErrorHandler } from '../utils/create-error-handler.js';
import { createRouterFactory } from '../utils/create-router.js';
import { genSignaturesToken } from '../utils/jwt-auth.js';
const { router, setup } = createRouterFactory('/user');
export { setup as UserSetup };

router.post(
  '/auth',
  createErrorHandler(async (req, res) => {
    const { useBody, useSuccessResponse } = useHookFactory(req, res);

    const { username, password } = useBody<{ username: string; password: string }>(
      {},
    );

    if (!username || !password) {
      throw new Error('The username or password cannot be empty');
    }

    const user = await findUser({ username });
    // if user not exist
    if (!user) {
      throw new Error('The user does not exist');
    }

    const profile = await userLogin({ username, password });
    if (!profile) {
      throw new Error('The password verification is failed');
    }
    const sign = await genSignaturesToken({
      ...profile,
      name: profile.name || '',
    });
    useSuccessResponse('The login verification is successful', sign);
  }),
);

router.get(
  '/profile',
  createErrorHandler(async (req, res) => {
    const { useSuccessResponse } = useHookFactory(req, res)
    useSuccessResponse('get profile success', Reflect.get(req, profileKey));
  }),
);
// TODO: refresh

['/user/auth'].forEach(path => {
  setWhiteRouter(path)
})