import type { Express, Request, Response, NextFunction } from 'express';
import { useHookFactory } from '../hooks/use-hook-factory.js';
import { profileKey } from '../config/index.js'
import { verifyToken } from '../utils/jwt-auth.js';
import { createErrorHandler } from '../utils/create-error-handler.js';

const whiteRouter: string[] = [];
export function setWhiteRouter(path: string) {
  whiteRouter.push(path);
}

export function isIncludeRouterOfWhiteRouter(path: string) {
  return whiteRouter.includes(path);
}
const useAuthGuard = createErrorHandler(async function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const { useForbidden } = useHookFactory(req, res);
  if (!token && !isIncludeRouterOfWhiteRouter(req.path)) {
    useForbidden('token is empty');
    return
  }

  if (token) {
    try {
      const profile = await verifyToken(token)
      Reflect.set(req, profileKey, profile)
    } catch (e) {
      if (isIncludeRouterOfWhiteRouter(req.path)) {
        next()
        return
      }
      console.error(e);
      useForbidden(e?.toString() || '')
      return
    }
  }
  next();
})

export function setupAuthGuard(app: Express) {
  app.use(useAuthGuard);
}
