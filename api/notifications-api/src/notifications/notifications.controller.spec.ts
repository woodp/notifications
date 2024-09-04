import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Message } from '../messages/entities/message.entity';
import { User } from './entities/user.entity';
import { MessagesService } from '../messages/messages.service';
import { NotificationsService } from './notifications.service';
import { DeliveriesService } from './deliveries.service';
import { SmsNotificationStrategy } from './strategies/sms-notification-strategy';
import { PushNotificationStrategy } from './strategies/push-notification-strategy';
import { EmailNotificationStrategy } from './strategies/email-notification-strategy';
import { Notification } from './entities/notification.entity';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: Number(process.env.POSTGRES_PORT) || 5432,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          logging: true,
          synchronize: false,
          name: 'default',
          entities: [Category, Notification, Message, User],
        }),
        TypeOrmModule.forFeature([Category, Notification, Message, User]),
      ],
      controllers: [NotificationsController],
      providers: [
        MessagesService,
        NotificationsService,
        DeliveriesService,
        SmsNotificationStrategy,
        PushNotificationStrategy,
        EmailNotificationStrategy,
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
