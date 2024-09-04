import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Notification } from './entities/notification.entity';
import { Message } from '../messages/entities/message.entity';
import { User } from './entities/user.entity';
import {
  emailNotifications,
  finance,
  financeMessage,
  pushNotifications,
  smsNotifications,
  users,
} from '../../test/mock-data';
import { SmsNotificationStrategy } from './strategies/sms-notification-strategy';
import { EmailNotificationStrategy } from './strategies/email-notification-strategy';
import { PushNotificationStrategy } from './strategies/push-notification-strategy';
import { DeliveriesService } from './deliveries.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let emailService: EmailNotificationStrategy;
  let pushService: PushNotificationStrategy;
  let smsService: SmsNotificationStrategy;

  const notificationsRepositoryMock = {
    find: jest.fn(),
    save: jest.fn(),
  };

  const usersRepositoryMock = {
    find: jest.fn(),
  };

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
      providers: [
        NotificationsService,
        SmsNotificationStrategy,
        EmailNotificationStrategy,
        PushNotificationStrategy,
        DeliveriesService,
        {
          provide: getRepositoryToken(Notification),
          useValue: notificationsRepositoryMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    emailService = module.get<EmailNotificationStrategy>(
      EmailNotificationStrategy,
    );
    smsService = module.get<SmsNotificationStrategy>(SmsNotificationStrategy);
    pushService = module.get<PushNotificationStrategy>(
      PushNotificationStrategy,
    );
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('deliver emails', async () => {
      notificationsRepositoryMock.find.mockImplementation(() =>
        Promise.resolve(emailNotifications),
      );
      const emailSpy = jest.spyOn(emailService, 'sendNotification');
      const smsSpy = jest.spyOn(smsService, 'sendNotification');
      const pushSpy = jest.spyOn(pushService, 'sendNotification');
      const saveSpy = jest.spyOn(notificationsRepositoryMock, 'save');
      await service.deliver(0);
      expect(emailSpy).toHaveBeenCalled();
      expect(smsSpy).not.toHaveBeenCalled();
      expect(pushSpy).not.toHaveBeenCalled();

      expect(saveSpy).toHaveBeenCalled();
    });

    it('deliver sms', async () => {
      notificationsRepositoryMock.find.mockImplementation(() =>
        Promise.resolve(smsNotifications),
      );
      const emailSpy = jest.spyOn(emailService, 'sendNotification');
      const smsSpy = jest.spyOn(smsService, 'sendNotification');
      const pushSpy = jest.spyOn(pushService, 'sendNotification');
      const saveSpy = jest.spyOn(notificationsRepositoryMock, 'save');
      await service.deliver(0);
      expect(smsSpy).toHaveBeenCalled();
      expect(emailSpy).not.toHaveBeenCalled();
      expect(pushSpy).not.toHaveBeenCalled();

      expect(saveSpy).toHaveBeenCalled();
    });

    it('deliver push', async () => {
      notificationsRepositoryMock.find.mockImplementation(() =>
        Promise.resolve(pushNotifications),
      );
      const emailSpy = jest.spyOn(emailService, 'sendNotification');
      const smsSpy = jest.spyOn(smsService, 'sendNotification');
      const pushSpy = jest.spyOn(pushService, 'sendNotification');
      const saveSpy = jest.spyOn(notificationsRepositoryMock, 'save');
      await service.deliver(0);
      expect(pushSpy).toHaveBeenCalled();
      expect(emailSpy).not.toHaveBeenCalled();
      expect(smsSpy).not.toHaveBeenCalled();

      expect(saveSpy).toHaveBeenCalled();
    });

    it('when retries is greater than max should not send', async () => {
      notificationsRepositoryMock.find.mockImplementation(() =>
        Promise.resolve(emailNotifications),
      );
      const emailSpy = jest.spyOn(emailService, 'sendNotification');
      const smsSpy = jest.spyOn(smsService, 'sendNotification');
      const pushSpy = jest.spyOn(pushService, 'sendNotification');
      await service.deliver(4);
      expect(pushSpy).not.toHaveBeenCalled();
      expect(emailSpy).not.toHaveBeenCalled();
      expect(smsSpy).not.toHaveBeenCalled();
    });

    it('save should create notifications', async () => {
      usersRepositoryMock.find.mockImplementation(() => Promise.resolve(users));
      const saveSpy = jest.spyOn(notificationsRepositoryMock, 'save');
      const notifications = await service.save(financeMessage);
      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          category: finance,
          message: 'Test',
          retries: 0,
        }),
      );
      expect(notifications.length).toBe(6);
    });
  });
});
