import type { Pagination } from '../types/base';
import { transformPagination } from '../utils/transform-pagination.js';
import { getInstance } from './init.js';

export async function findPasswordList<T extends Pagination & { uid: number }>(
  params: T,
  title?: string,
) {
  const { page = 1, size = 10, uid } = params;
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
    passwordIns.findMany({ where, take, skip, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] })
  ])
}


export function findPassword(id: number, uid: number) {
  const passwordIns = getInstance('password')
  return passwordIns.findFirst({ where: { id, uid } })
}