import {Navigate} from 'react-router-native';
import {refreshTokenApi} from '../features/login/apis';
import type {IBaseResponse} from '../typings/request';
import request from './request';
import {
  getRefreshToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from './storage';

export async function requestGuard<T>(
  data: IBaseResponse<T>,
  url: string,
  options: RequestInit,
): Promise<T | undefined> {
  console.log(`[request guard ${url}] :`, data);
  if (data.code === 200) {
    return data.data;
  } else if (data.code === 401) {
    console.log(`[refresh token ${url}]`);
    // 重新发送
    try {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        const recourse = await refreshTokenApi(refreshToken);
        if (recourse) {
          await Promise.all([
            setToken(recourse.accessToken),
            setRefreshToken(recourse.refreshToken),
          ]);
          return await request<T>(url, options);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  await Promise.all([removeRefreshToken(), removeToken()]);
  // to login
  Navigate({to: '/login'});
  throw new Error(data.message);
}
