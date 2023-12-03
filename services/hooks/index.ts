import type { Profile } from '../types/base.js';
import './use-body.js';
import './use-forbidden.js';
import './use-header.js';
import './use-profile.js';
import './use-success-response.js';
import './use-throw-service-error.js';

export interface RegisterHookFactory {
  useBody<T>(initialValue: Partial<T>): T;
  useSuccessResponse<T>(message: string, data?: T | null): void;
  useThrowServiceError(message: string): void;
  useForbidden(message: string): void;
  useProfile(): [Profile, (profile: Profile) => void];
  useHeader<T extends keyof Headers | string>(...args: T[]): string[];
}
