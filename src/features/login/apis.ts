import {post} from '../../utils/request';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginReturnType {
  accessToken: string;
  refreshToken: string;
}

export function fetchLogin(data: ILoginParams) {
  return post<ILoginReturnType>('/user/login', {
    data,
  });
}
