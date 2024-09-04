import { ErrorType } from './error-type.enum';

export class BusinessError extends Error {
  type: ErrorType;
  constructor(type: ErrorType, message: string) {
    super(message);
    this.type = type;
  }
}
