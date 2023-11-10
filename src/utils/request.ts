const BASE_URL = 'http://localhost:30001';
async function request<T>(url: string, options?: RequestInit) {
  options = options || {};
  if (!options.method) {
    options.method = 'GET';
  }

  setDefaultContentType(options);

  try {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    const response = await fetch(`${BASE_URL}${url}`, options);
    const ContentType = response.headers.get('content-type') || '';

    if (isResponseJson(ContentType)) {
      return response.json() as T;
    }
    return response.text() as T;
  } catch (e) {
    console.log(e);
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

export function get<T>(url: string, options?: RequestInit) {
  return request<T>(url, {
    ...options,
    method: 'GET',
  });
}

export function post<T>(url: string, options?: RequestInit) {
  return request<T>(url, {
    ...options,
    method: 'POST',
  });
}
