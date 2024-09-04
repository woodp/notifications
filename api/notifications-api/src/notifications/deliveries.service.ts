import { Injectable } from '@nestjs/common';
import { SmsNotificationStrategy } from './strategies/sms-notification-strategy';
import { EmailNotificationStrategy } from './strategies/email-notification-strategy';
import { PushNotificationStrategy } from './strategies/push-notification-strategy';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './models/notification-type.enum';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly smsStrategy: SmsNotificationStrategy,
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly pushStrategy: PushNotificationStrategy,
  ) {}

  buildDeliveries(notifications: Notification[]) {
    const smsNotifications = notifications
      .filter((val) => val.type === NotificationType.SMS)
      .map((notif) => this.smsStrategy.sendNotification(notif));

    const emailNotifications = notifications
      .filter((val) => val.type === NotificationType.EMail)
      .map((notif) => this.emailStrategy.sendNotification(notif));

    const pushNotifications = notifications
      .filter((val) => val.type === NotificationType.Push)
      .map((notif) => this.pushStrategy.sendNotification(notif));

    // insert a new delivery service here

    return pushNotifications.concat(
      emailNotifications,
      smsNotifications,
      pushNotifications,
    );
  }
}
