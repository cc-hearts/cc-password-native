import {registerHook} from './register-hook.js';
import type {Request, Response} from 'express';

registerHook(
  'useSuccessResponse',
  <T>(_req: Request, res: Response, message: string, data: T | null = null) => {
    res.json({
      code: 200,
      message,
      data,
    });
  },
);
