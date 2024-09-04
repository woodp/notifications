import { Injectable, Logger } from '@nestjs/common';
import { Notification } from '../entities/notification.entity';
import { NotificationResult } from '../models/notification-result';
import { INotificationStrategy } from './notification-strategy.interface';

@Injectable()
export class PushNotificationStrategy implements INotificationStrategy {
  private readonly logger = new Logger(PushNotificationStrategy.name);

  async sendNotification(
    notification: Notification,
  ): Promise<NotificationResult> {
    // Implement the actual Push Notification sending logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log(
          `Push notification sent to ${notification.user.phone}: ${notification.message}`,
        );
        resolve(new NotificationResult(true, notification));
      }, 100);
    });
  }
}
