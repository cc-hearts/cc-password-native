import {isFn, isStr, isUndef} from '@cc-heart/utils';
import type {Request, Response} from 'express';
import {hookMap} from './register-hook.js';
import type {RegisterHookFactory} from './register.js';
export function useHookFactory<T extends RegisterHookFactory>(
  req: Request,
  res: Response,
  hookName?: keyof RegisterHookFactory | Array<keyof RegisterHookFactory>,
): T {
  if (isUndef(hookName)) {
    hookName = [...hookMap.keys()];
  } else if (isStr(hookName)) {
    hookName = [hookName];
  }
  return hookName.reduce((acc, key: keyof RegisterHookFactory) => {
    const fn = hookMap.get(key);
    if (isFn(fn)) {
      Reflect.set(acc, key, fn.bind(null, req, res));
    }
    return acc;
  }, {} as T);
}
