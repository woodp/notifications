import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @Unique(['name'])
  name: string;
}
