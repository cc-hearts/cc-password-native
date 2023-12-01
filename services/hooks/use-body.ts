// register useBody
import type {Request, Response} from 'express';
import {registerHook} from './register-hook.js';
import {isObject} from '@cc-heart/utils';

registerHook('useBody', <T>(req: Request, _res: Response, initalVal: T) => {
  const body = req.body;
  if (!body && initalVal) {
    return initalVal;
  }
  if (req.get('Content-Type') === 'application/json') {
    if (isObject(initalVal) && isObject(body)) {
      return Object.assign(initalVal, body);
    }
    return body || initalVal;
  }

  return body;
});
