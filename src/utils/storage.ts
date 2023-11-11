import AsyncStorage from '@react-native-async-storage/async-storage';

export function setRefreshToken(data: string) {
  AsyncStorage.setItem('refreshToken', data);
}

export function getRefreshToken() {
  return AsyncStorage.getItem('refreshToken');
}

export function setToken(data: string) {
  AsyncStorage.setItem('token', data);
}

export function getToken() {
  return AsyncStorage.getItem('token');
}
