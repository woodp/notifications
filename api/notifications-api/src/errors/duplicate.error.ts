import { BusinessError } from './business.error';
import { ErrorType } from './error-type.enum';

export class DuplicateError extends BusinessError {
  constructor(message: string) {
    super(ErrorType.Duplicate, message);
  }
}
