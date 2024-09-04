import { Controller, Get, Logger } from '@nestjs/common';
import { handleError } from '../errors/handle-error';
import { NotificationsService } from './notifications.service';
import { Mappers } from './mappers';
import { ApiResponse } from '@nestjs/swagger';
import { NotificationDto } from './dtos/notification.dto';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({ type: NotificationDto, isArray: true })
  @Get()
  async get() {
    try {
      const res = await this.notificationsService.get();
      return res.map(Mappers.toNotificationDto);
    } catch (e) {
      handleError(e, this.logger);
    }
  }
}
