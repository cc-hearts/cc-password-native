import type { Request, Response } from 'express';
import { registerHook } from './register-hook.js';
import { profileKey } from '../config/index.js'
registerHook(
  'useProfile',
  (req: Request) => {
    return req[profileKey]
  },
);
