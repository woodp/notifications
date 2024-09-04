import { BusinessError } from './business.error';
import { ErrorType } from './error-type.enum';

export class NotFoundError extends BusinessError {
  constructor(message: string) {
    super(ErrorType.NotFound, message);
  }
}
