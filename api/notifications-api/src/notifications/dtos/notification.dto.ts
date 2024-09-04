import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/dtos/category.dto';
import { NotificationType } from '../models/notification-type.enum';

export class NotificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  type: NotificationType;

  @ApiProperty()
  category: CategoryDto;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  sent: boolean;

  @ApiProperty()
  createdAt?: Date;
}
