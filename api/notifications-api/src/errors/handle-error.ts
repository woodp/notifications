import {
  ConflictException,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from './not-found.error';
import { DuplicateError } from './duplicate.error';

export const handleError = (e: Error | HttpException, logger: Logger) => {
  logger.error(e.message);
  if (e instanceof NotFoundError) throw new NotFoundException(e.message);
  if (e instanceof DuplicateError) throw new ConflictException(e.message);
  throw e;
};
