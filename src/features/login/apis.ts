import {post} from '../../utils/request';

export interface ILoginParams {
  username: string;
  password: string;
}

export function fetchLogin(data: any) {
  return post<ILoginParams>('/user/login', data);
}
