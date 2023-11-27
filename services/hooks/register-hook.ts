import type {fn} from '@cc-heart/utils/helper';
import type {Request, Response} from 'express';

export const hookMap = new Map<PropertyKey, fn>();

export function registerHook(
  name: string,
  fn: (req: Request, res: Response, ...rest: any[]) => any,
) {
  hookMap.set(name, fn);
}
