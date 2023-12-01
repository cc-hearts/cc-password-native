import type { Pagination } from '../../services/types/base';

export function transformPagination<T extends Pagination>(params: T) {
  const { page, size } = params;
  const skip = (page - 1) * size;
  return { skip, take: size };
}
