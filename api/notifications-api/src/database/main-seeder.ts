import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';
import { Category } from '../categories/entities/category.entity';
import { User } from '../notifications/entities/user.entity';
import { NotificationType } from '../notifications/models/notification-type.enum';

// config();

// const configService = new ConfigService();

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const categories: Category[] = [];
    const finance = { id: uuid(), name: 'Finance' } as Category;
    categories.push(finance);
    const sports = { id: uuid(), name: 'Sports' } as Category;
    categories.push(sports);
    const movies = { id: uuid(), name: 'Movies' } as Category;
    categories.push(movies);

    const categoryRepo = dataSource.getRepository(Category);
    await categoryRepo.save(categories);

    const users: User[] = [];
    const user1 = {
      id: uuid(),
      email: 'test1@mail.com',
      name: 'Test1',
      phone: '545454545454',
      channels: [NotificationType.EMail, NotificationType.SMS],
      suscribed: [sports, movies],
    } as User;
    users.push(user1);

    const user2 = {
      id: uuid(),
      email: 'test2@mail.com',
      name: 'Test2',
      phone: '545454545454',
      channels: [NotificationType.Push, NotificationType.SMS],
      suscribed: [finance, movies],
    } as User;
    users.push(user2);

    const userRepo = dataSource.getRepository(User);
    await userRepo.save(users);
  }
}
