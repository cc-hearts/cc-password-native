import {isObject} from '@cc-heart/utils';
import {requestGuard} from './request-guard';
import {IBaseResponse} from '../typings/request';
import {BASE_API_URL} from '../config';
import {getToken} from './storage';

const BASE_URL = BASE_API_URL;

async function setAuthorization(options: RequestInit) {
  const token = await getToken();
  options.headers = options.headers || {};
  Reflect.set(options.headers, 'Authorization', `Bearer ${token}`);
}

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T | undefined> {
  options = options || {};
  if (!options.method) {
    options.method = 'GET';
  }

  setDefaultContentType(options);

  await setAuthorization(options);

  try {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    if (__DEV__) {
      console.log('request url:', `${BASE_URL}${url}`);
      console.log('request options:', options);
    }
    const response = await fetch(`${BASE_URL}${url}`, options);
    const ContentType = response.headers.get('content-type') || '';

    if (isResponseJson(ContentType)) {
      const recourse = (await response.json()) as IBaseResponse<T>;
      return await requestGuard<T>(recourse, url, options);
    }
    return response.text() as T;
  } catch (e) {
    console.error('request error:', e);
    return Promise.reject(e);
  }
}

function setDefaultContentType(options: RequestInit) {
  if (!options.headers) {
    options.headers = {} as RequestInit['headers'];
  }
  if (!Reflect.get(options.headers!, 'Content-Type')) {
    Reflect.set(options.headers!, 'Content-Type', 'application/json');
  }
}

function isSpecifyResponseType(contentType: string, reg: RegExp): boolean {
  return reg.test(contentType);
}

function isResponseJson(contentType: string): boolean {
  return isSpecifyResponseType(contentType, /application\/json/);
}

export default request;

interface IOptions extends RequestInit {
  data?: any;
}
function formatOptions(options: IOptions = {}) {
  const {data, ...rest} = options;
  if (isObject(data)) {
    rest.body = JSON.stringify(data);
  }
  return rest;
}

export function get<T>(url: string, options?: IOptions) {
  return request<T>(url, {
    ...formatOptions(options),
    method: 'GET',
  });
}

export function post<T>(url: string, options?: IOptions) {
  return request<T>(url, {
    ...formatOptions(options),
    method: 'POST',
  });
}
