import type {Express} from 'express';
import {setupAuthGuard} from './auth-guard.js';
import {setupErrorCatch} from './error-catch.js';
import {setupParseJson} from './parse-json.js';

export async function loadMiddle(app: Express) {
  await Promise.all([setupAuthGuard, setupParseJson].map(setup => setup(app)));
}

export async function afterLoadMiddle(app: Express) {
  await Promise.all([setupErrorCatch].map(setup => setup(app)));
}
