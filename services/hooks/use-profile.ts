import type { Request } from 'express';
import { profileKey } from '../config/index.js';
import type { Profile } from '../types/base';
import { registerHook } from './register-hook.js';

registerHook(
  'useProfile',
  (req: Request) => {
    const setProfile = (profile: Profile) => {
      Reflect.set(req, profileKey, profile);
    }
    return [Reflect.get(req, profileKey), setProfile];
  },
);
