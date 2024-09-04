import { CategoryDto } from 'src/categories/dtos/category.dto';
import { Category } from 'src/categories/entities/category.entity';
import { Notification } from './entities/notification.entity';
import { NotificationDto } from './dtos/notification.dto';

export class Mappers {
  static toCategoryDto(cat: Category) {
    return {
      id: cat.id,
      name: cat.name,
    } as CategoryDto;
  }

  static toNotificationDto(notif: Notification) {
    return {
      category: Mappers.toCategoryDto(notif.category),
      id: notif.id,
      message: notif.message,
      sent: notif.sent,
      type: notif.type,
      userName: notif.user.name,
      createdAt: notif.createdAt,
    } as NotificationDto;
  }
}
