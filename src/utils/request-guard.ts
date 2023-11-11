import type {IBaseResponse} from '../typings/request';

export async function requestGuard<T>(data: IBaseResponse<T>) {
  if (data.code === 200) {
    return data.data;
  }
  throw new Error(data.message);
}
