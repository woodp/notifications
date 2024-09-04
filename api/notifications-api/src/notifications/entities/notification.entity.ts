import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationType } from '../models/notification-type.enum';
import { Category } from '../../categories/entities/category.entity';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  type: NotificationType;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: false })
  sent: boolean;

  @Column({ default: 0 })
  retries: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
