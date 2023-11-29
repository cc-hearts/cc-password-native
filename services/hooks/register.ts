import './use-body.js';
import './use-success-response.js';
import './use-throw-service-error.js';
import './use-forbidden.js';
import type { Profile } from '../types/base'

export interface RegisterHookFactory {
  useBody<T>(initalVal: Partial<T>): T;
  useSuccessResponse<T>(message: string, data?: T | null): void;
  useThrowServiceError(message: string): void;
  useForbidden(message: string): void;
  useProfile(): Profile
}
