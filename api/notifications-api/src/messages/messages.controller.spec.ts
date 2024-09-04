import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { NotificationsService } from '../notifications/notifications.service';
import { DeliveriesService } from '../notifications/deliveries.service';
import { SmsNotificationStrategy } from '../notifications/strategies/sms-notification-strategy';
import { PushNotificationStrategy } from '../notifications/strategies/push-notification-strategy';
import { EmailNotificationStrategy } from '../notifications/strategies/email-notification-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { Message } from './entities/message.entity';
import { User } from '../notifications/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

describe('MessagesController', () => {
  let controller: MessagesController;

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
      controllers: [MessagesController],
      providers: [
        MessagesService,
        NotificationsService,
        DeliveriesService,
        SmsNotificationStrategy,
        PushNotificationStrategy,
        EmailNotificationStrategy,
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
