import './use-body.js';
import './use-success-response.js';
import './use-throw-service-error.js';

export interface RegisterHookFactory {
  useBody<T>(initalVal: Partial<T>): T;
  useSuccessResponse<T>(message: string, data?: T | null): void;
  useThrowServiceError(message: string): void;
}
