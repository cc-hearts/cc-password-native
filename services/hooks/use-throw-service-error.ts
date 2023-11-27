import {registerHook} from './register-hook.js';
import type {Request, Response} from 'express';

registerHook(
  'useThrowServiceError',
  (_req: Request, res: Response, message: string) => {
    res.json({
      code: 500,
      message,
    });
  },
);
