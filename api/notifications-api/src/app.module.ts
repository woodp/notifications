import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './notifications/notifications.module';
import { Category } from './categories/entities/category.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Message } from './messages/entities/message.entity';
import { User } from './notifications/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_HOST) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: true,
      synchronize: false,
      name: 'default',
      entities: [Category, Notification, Message, User],
    }),
    NotificationsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
