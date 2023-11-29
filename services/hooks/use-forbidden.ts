import {getCurrentTimeISOString} from '@cc-heart/utils';
import {registerHook} from './register-hook.js';
import type {Request, Response} from 'express';

registerHook(
  'useForbidden',
  (_req: Request, res: Response, message: string) => {
    res.json({
      code: 401,
      timestamp: getCurrentTimeISOString(),
      message,
    });
  },
);
