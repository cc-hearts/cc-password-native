import {setupParseJson} from './parse-json.js';
import type {Express} from 'express';

export async function loadMiddle(app: Express) {
  await Promise.all([setupParseJson].map(setup => setup(app)));
}
