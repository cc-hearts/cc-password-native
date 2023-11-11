import AsyncStorage from '@react-native-async-storage/async-storage';

export function setRefreshToken(data: string) {
  AsyncStorage.setItem('refreshToken', data);
}

export function getRefreshToken() {
  return AsyncStorage.getItem('refreshToken');
}

export function removeRefreshToken() {
  return AsyncStorage.removeItem('refreshToken');
}
export function setToken(data: string) {
  AsyncStorage.setItem('token', data);
}

export function getToken() {
  return AsyncStorage.getItem('token');
}

export function removeToken() {
  return AsyncStorage.removeItem('token');
}
