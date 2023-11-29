import { createRouterFactory } from '../utils/create-router.js';
import { createErrorHandler } from '../utils/create-error-handler.js';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import { findPasswordList } from '../modal/password.js';


const { router, setup } = createRouterFactory('/password');
export { setup as PasswordSetup };



router.post('findPasswordList', createErrorHandler(async function (req, res) {
  const { useProfile, useBody, useSuccessResponse } = useHookFactory(req, res)
  const { uid } = useProfile()
  const body = useBody({ page: 1, size: 10 })
  const response = await findPasswordList({ ...body, uid })

  useSuccessResponse('get password list is success', response)
}))