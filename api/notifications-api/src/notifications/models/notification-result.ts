import { Notification } from '../entities/notification.entity';

export class NotificationResult {
  success: boolean;
  notification: Notification;
  errorMessage: string;

  constructor(
    success: boolean,
    notification: Notification,
    errorMessage: string = null,
  ) {
    this.success = success;
    this.notification = notification;
    this.errorMessage = errorMessage;
  }
}
