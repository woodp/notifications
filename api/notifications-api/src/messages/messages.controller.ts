import { Body, Controller, Logger, Post } from '@nestjs/common';
import { handleError } from '../errors/handle-error';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);
  constructor(
    private readonly messagesService: MessagesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(@Body() body: CreateMessageDto) {
    try {
      const message = await this.messagesService.create(
        body.categoryId,
        body.text,
      );
      await this.notificationsService.save(message);
      await this.notificationsService.deliver(0);
    } catch (e) {
      handleError(e, this.logger);
    }
  }
}
