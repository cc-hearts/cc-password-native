import type { Request, } from 'express';
import { registerHook } from './register-hook.js';
import { profileKey } from '../config/index.js'
registerHook(
  'useProfile',
  (req: Request) => {
    return Reflect.get(req, profileKey);
  },
);
