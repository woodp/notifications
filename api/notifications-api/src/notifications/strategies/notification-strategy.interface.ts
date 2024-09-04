import { Notification } from '../entities/notification.entity';
import { NotificationResult } from '../models/notification-result';

export interface INotificationStrategy {
  sendNotification(notification: Notification): Promise<NotificationResult>;
}
