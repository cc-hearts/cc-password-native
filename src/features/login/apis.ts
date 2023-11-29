import {post, get} from '../../utils/request';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginReturnType {
  accessToken: string;
  refreshToken: string;
}

export function fetchLogin(data: ILoginParams) {
  return post<ILoginReturnType>('/user/auth', {
    data,
  });
}

export interface Profile {
  uid: number;
  name: string;
  username: string;
  plain: string;
  iat: number;
  exp: number;
}

export function getProfile() {
  return get<Profile>('/user/profile');
}

export async function refreshTokenApi(refreshToken: string) {
  return post<ILoginReturnType>('user/refresh', {
    data: {refreshToken},
  });
}
