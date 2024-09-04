import { HttpException, Logger, NotFoundException } from '@nestjs/common';
import { NotFoundError } from './not-found.error';

export const handleError = (e: Error | HttpException, logger: Logger) => {
  logger.error(e.message);
  if (e instanceof NotFoundError) throw new NotFoundException(e.message);
  throw e;
};
