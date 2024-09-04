import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Message } from '../messages/entities/message.entity';
import { SmsNotificationStrategy } from './strategies/sms-notification-strategy';
import { Notification } from './entities/notification.entity';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { DeliveriesService } from './deliveries.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(SmsNotificationStrategy.name);
  private readonly maxRetries: number;
  private readonly batchSize: number;
  private readonly backoffOffset: number = 2;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly deliveriesService: DeliveriesService,
  ) {
    this.maxRetries = this.configService.get('NOTIFICATIONS_MAX_RETRIES') || 3;
    this.batchSize = this.configService.get('NOTIFICATIONS_BATCH_SIZE') || 100;
  }

  async save(message: Message) {
    const suscribed = await this.usersRepository.find({
      relations: { suscribed: true },
      where: {
        suscribed: {
          id: message.category.id,
        },
      },
    });

    const notifications: Notification[] = [];

    for (const user of suscribed) {
      const userNotifications = user.channels.map((channel) => {
        return {
          id: uuid(),
          category: message.category,
          message: message.text,
          type: channel,
          user: user,
        } as Notification;
      });
      notifications.push(...userNotifications);
    }

    await this.notificationsRepository.save(notifications);
    return notifications;
  }

  async deliver(retries: number) {
    if (retries > this.maxRetries) return;

    const notifications = await this.notificationsRepository.find({
      take: this.batchSize,
      relations: { user: true },
      where: { sent: false, retries: LessThan(this.maxRetries) },
    });

    const allNotifications =
      this.deliveriesService.buildDeliveries(notifications);

    const results = await Promise.all(allNotifications);

    const successful = results.filter((val) => val.success === true);

    successful.forEach(async (res) => {
      res.notification.sent = true;
      await this.notificationsRepository.save(res.notification);
      this.logger.log(`Notification was sent ${res.notification.id}`);
    });

    const failed = results.filter((val) => val.success === false);
    failed.forEach(async (res) => {
      this.logger.log(
        `Notification failed ${res.notification.id}, retries ${res.notification.retries}`,
      );
      res.notification.retries++;
      await this.notificationsRepository.save(res.notification);
    });

    retries++;

    if (results.some((el) => !el.success)) {
      setTimeout(
        () => this.deliver(retries),
        (retries + this.backoffOffset) * 1000,
      );
    } else {
      if (notifications.length === this.batchSize) await this.deliver(0); // process second batch
    }
  }

  async get() {
    return await this.notificationsRepository.find({
      relations: { user: true, category: true },
      order: { createdAt: 'DESC' },
    });
  }
}
