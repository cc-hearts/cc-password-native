import { profileKey } from '../config/index.js';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import { setWhiteRouter } from '../middleware/auth-guard.js';
import { findUser, findUserById, userLogin } from '../modal/user.js';
import { Profile } from '../types/base.js';
import { createErrorHandler } from '../utils/create-error-handler.js';
import { createRouterFactory } from '../utils/create-router.js';
import { encodeAes } from '../utils/crypto.js';
import { decodeToken, genSignaturesToken, verifyToken } from '../utils/jwt-auth.js';

const { router, setup } = createRouterFactory('/user');
export { setup as UserSetup };

const genSign = async (profile: Omit<Profile, 'plain' | 'uid' | 'name'> & { name: string | null }) => {
  return await genSignaturesToken({ ...profile, name: profile.name || '' })
}

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
    const sign = await genSign(profile!);
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

router.post(
  '/refresh',
  createErrorHandler(async (req, res) => {
    const { useHeader, useBody, useSuccessResponse } = useHookFactory(req, res)
    const { refreshToken } = useBody<{ refreshToken: string }>({})
    if (!refreshToken) {
      throw new Error('The refreshToken cannot be empty')
    }

    const [authorization] = useHeader('authorization')
    const token = authorization?.replace('Bearer ', '')
    if (!token) {
      throw new Error('The token cannot be empty')
    }
    const profile = await decodeToken(token) as Profile | null
    if (!profile) {
      throw new Error('The token is invalid')
    }
    const { id, plain } = profile

    await verifyToken(refreshToken, encodeAes(plain))

    const newProfile = await findUserById(id)
    if (!newProfile) {
      throw new Error('The user does not exist')
    }
    const sign = await genSign(newProfile)
    useSuccessResponse('refresh token is successful', sign);
  }),
);

['/user/auth'].forEach(path => {
  setWhiteRouter(path)
})