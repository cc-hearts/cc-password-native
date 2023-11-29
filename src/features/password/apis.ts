import {Pagination} from '../../typings/request';
import {post} from '../../utils/request';

export function findPasswordList<T extends Pagination>(data: T) {
  return post<any>('password/findPasswordList', {
    data,
  });
}
