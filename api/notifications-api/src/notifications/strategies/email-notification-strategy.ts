import { Injectable, Logger } from '@nestjs/common';
import { Notification } from '../entities/notification.entity';
import { NotificationResult } from '../models/notification-result';
import { INotificationStrategy } from './notification-strategy.interface';

@Injectable()
export class EmailNotificationStrategy implements INotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  async sendNotification(
    notification: Notification,
  ): Promise<NotificationResult> {
    // Implement the actual Email sending logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log(
          `Email notification sent to ${notification.user.name}: ${notification.message}`,
        );
        resolve(new NotificationResult(true, notification));
      }, 100);
    });
  }
}
