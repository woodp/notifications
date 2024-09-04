import { Injectable, Logger } from '@nestjs/common';
import { Notification } from '../entities/notification.entity';
import { NotificationResult } from '../models/notification-result';
import { INotificationStrategy } from './notification-strategy.interface';

@Injectable()
export class SmsNotificationStrategy implements INotificationStrategy {
  private readonly logger = new Logger(SmsNotificationStrategy.name);

  async sendNotification(
    notification: Notification,
  ): Promise<NotificationResult> {
    // Implement the actual SMS sending logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log(
          `SMS notification sent to ${notification.user.phone}: ${notification.message}`,
        );
        resolve(new NotificationResult(true, notification));
      }, 100);
    });
  }
}
