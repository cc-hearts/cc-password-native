import type { Express, NextFunction, Request, Response } from 'express';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import type { Profile } from '../types/base';
import { createErrorHandler } from '../utils/create-error-handler.js';
import { verifyToken } from '../utils/jwt-auth.js';

const whiteRouter: string[] = [];
export function setWhiteRouter(path: string) {
  whiteRouter.push(path);
}

export function isIncludeRouterOfWhiteRouter(path: string) {
  return whiteRouter.includes(path);
}
const useAuthGuard = createErrorHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { useForbidden, useHeader,useProfile } = useHookFactory(req, res);

  const [, setProfile] = useProfile()
  const [authorization] = useHeader('authorization')
  const token = authorization?.split('Bearer ')[1]
  if (!token && !isIncludeRouterOfWhiteRouter(req.path)) {
    useForbidden('token is empty');
    return
  }

  if (token) {
    try {
      const profile = await verifyToken(token) as Profile
      setProfile(profile)
    } catch (e) {
      if (isIncludeRouterOfWhiteRouter(req.path)) {
        next()
        return
      }
      console.error('[token verify failed]',e);
      useForbidden(e?.toString() || '')
      return
    }
  }
  next();
})

export function setupAuthGuard(app: Express) {
  app.use(useAuthGuard);
}
