import { getInstance } from './init.js';
import type { Pagination } from '../types/base';
import { transformPagination } from '../utils/transform-pagination.js';

export async function findPasswordList<T extends Pagination & { uid: number }>(
  params: T,
  title?: string,
) {
  const { page, size, uid } = params;
  const { take, skip } = transformPagination({ page, size });

  const passwordIns = getInstance('password')

  const where = {
    uid
  }
  if (title) {
    Reflect.set(where, 'title', title)
  }
  return await Promise.all([
    passwordIns.count({ where }),
    passwordIns.findMany({ where, take, skip, orderBy: { createdAt: 'desc' } })
  ])
}
