import {Pagination} from '../../typings/request';
import {post} from '../../utils/request';

export function findPasswordList<T extends Pagination>(data: T) {
  return post<any>('password/findPasswordList', {
    data,
  });
}

export function findPassword(id: number) {
  return post<any>('password/findPassword', {
    data: {id},
  });
}
