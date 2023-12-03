import type { Express } from 'express';
import { UserSetup } from './user.module.js';
import { PasswordSetup } from './password.module.js'

export function loadModule(app: Express) {
  [UserSetup, PasswordSetup].forEach(setup => {
    setup(app);
  });
}
