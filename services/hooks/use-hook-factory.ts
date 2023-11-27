import {isFn, isStr, isUndef} from '@cc-heart/utils';
import {hookMap} from './register-hook.js';
import type {fn} from '@cc-heart/utils/helper.js';
import type {Request, Response} from 'express';

export function useHookFactory<T extends Record<PropertyKey, fn>>(
  req: Request,
  res: Response,
  hookName?: Array<PropertyKey>,
): T {
  if (isUndef(hookName)) {
    hookName = [...hookMap.keys()];
  } else if (isStr(hookName)) {
    hookName = [hookName];
  }
  return hookName.reduce((acc, key: keyof T) => {
    const fn = hookMap.get(key);
    if (isFn(fn)) {
      Reflect.set(acc, key, fn.bind(null, req, res));
    }
    return acc;
  }, {} as T);
}
