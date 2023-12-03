import CryptoJS from 'crypto-js';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import { findPassword, findPasswordList } from '../modal/password.js';
import { findSecurity } from '../modal/security.js';
import { createErrorHandler } from '../utils/create-error-handler.js';
import { createRouterFactory } from '../utils/create-router.js';
import { decodeAes } from '../utils/crypto.js';

const { router, setup } = createRouterFactory('/password');
export { setup as PasswordSetup };



router.post('/findPasswordList', createErrorHandler(async function (req, res) {
  const { useProfile, useBody, useSuccessResponse } = useHookFactory(req, res)
  const [{ uid }] = useProfile()
  const body = useBody({ page: 1, size: 10 })
  const response = await findPasswordList({ ...body, uid })

  useSuccessResponse('get password list is success', response)
}))


router.post('/findPassword', createErrorHandler(async function (req, res) {
  const { useProfile, useBody, useSuccessResponse } = useHookFactory(req, res)
  const [{ uid, plain }] = useProfile()
  const { id } = useBody({ id: -1 })
  if (id === -1) {
    throw new Error('The id cannot be empty')
  }
  const response = await findPassword(id, uid)
  if (!response) {
    throw new Error('The password does not exist')
  }
  const securityRes = await findSecurity({ uid })
  if (!securityRes) {
    throw new Error('The security does not exist')
  }
  const pwd = decodeAes(response.password, securityRes.security, securityRes.iv)
  const password = CryptoJS.AES.encrypt(pwd, plain).toString()
  useSuccessResponse('get password is success', password)
}))