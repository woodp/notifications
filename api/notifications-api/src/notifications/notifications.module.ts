import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from '../messages/messages.controller';
import { Category } from '../categories/entities/category.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';
import { MessagesService } from '../messages/messages.service';
import { NotificationsController } from './notifications.controller';
import { Message } from '../messages/entities/message.entity';
import { User } from './entities/user.entity';
import { DeliveriesService } from './deliveries.service';
import { SmsNotificationStrategy } from './strategies/sms-notification-strategy';
import { EmailNotificationStrategy } from './strategies/email-notification-strategy';
import { PushNotificationStrategy } from './strategies/push-notification-strategy';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesController } from '../categories/categories.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Category, Notification, Message, User]),
  ],
  controllers: [
    MessagesController,
    NotificationsController,
    CategoriesController,
  ],
  providers: [
    MessagesService,
    NotificationsService,
    DeliveriesService,
    SmsNotificationStrategy,
    EmailNotificationStrategy,
    PushNotificationStrategy,
    CategoriesService,
  ],
})
export class NotificationsModule {}
