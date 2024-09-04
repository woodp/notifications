import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, Unique } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { NotificationType } from '../models/notification-type.enum';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  phone: string;

  @ManyToMany(() => Category)
  @JoinTable()
  suscribed: Category[];

  @Column('simple-array')
  channels: string[];
}
