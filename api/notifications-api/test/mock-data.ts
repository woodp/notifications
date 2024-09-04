import { User } from '../src/notifications/entities/user.entity';
import { Category } from '../src/categories/entities/category.entity';
import { Notification } from '../src/notifications/entities/notification.entity';
import { NotificationType } from '../src/notifications/models/notification-type.enum';
import { v4 as uuid } from 'uuid';
import { Message } from '../src/messages/entities/message.entity';

export const finance = { id: uuid(), name: 'Finance' } as Category;

const john = {
  id: uuid(),
  name: 'John',
  email: 'john@mail.com',
  phone: '454545545',
  suscribed: [finance],
  channels: [
    NotificationType.EMail,
    NotificationType.Push,
    NotificationType.SMS,
  ],
} as User;

const jack = {
  id: uuid(),
  name: 'Jack',
  email: 'jack@mail.com',
  phone: '454545545',
  suscribed: [finance],
  channels: [
    NotificationType.EMail,
    NotificationType.Push,
    NotificationType.SMS,
  ],
} as User;

export const users = [jack, john];

export const emailNotifications = [
  buildNotification(0, finance, john, NotificationType.EMail),
  buildNotification(0, finance, jack, NotificationType.EMail),
];

export const smsNotifications = [
  buildNotification(0, finance, john, NotificationType.SMS),
  buildNotification(0, finance, jack, NotificationType.SMS),
];

export const pushNotifications = [
  buildNotification(0, finance, john, NotificationType.Push),
  buildNotification(0, finance, jack, NotificationType.Push),
];

export const maxRetriedNotifications = [
  buildNotification(4, finance, john, NotificationType.Push),
  buildNotification(4, finance, jack, NotificationType.Push),
];

export const financeMessage = {
  id: uuid(),
  category: finance,
  text: 'Foo',
} as Message;

function buildNotification(
  retries: number,
  category: Category,
  user: User,
  type: NotificationType,
  sent = false,
) {
  return {
    id: uuid(),
    category,
    type,
    message: 'Test',
    retries,
    sent,
    user,
  } as Notification;
}
