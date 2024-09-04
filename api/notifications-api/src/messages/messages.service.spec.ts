import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { Message } from './entities/message.entity';
import { User } from '../notifications/entities/user.entity';
import { finance, financeMessage } from '../../test/mock-data';
import { MessagesService } from './messages.service';
import { NotFoundError } from '../errors/not-found.error';

describe('MessageService', () => {
  let service: MessagesService;
  const messagesRepositoryMock = {
    save: jest.fn(),
  };

  const categoriesRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: Number(process.env.POSTGRES_PORT) || 5432,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          logging: true,
          synchronize: false,
          name: 'default',
          entities: [Category, Notification, Message, User],
        }),
        TypeOrmModule.forFeature([Category, Notification, Message, User]),
      ],
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: messagesRepositoryMock,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: categoriesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create message', async () => {
    const messageMock = messagesRepositoryMock.save.mockImplementation(() =>
      Promise.resolve(financeMessage),
    );
    const categoriesMock = categoriesRepositoryMock.findOne.mockImplementation(
      () => Promise.resolve(finance),
    );

    await service.create(finance.id, financeMessage.text);
    expect(categoriesMock).toHaveBeenCalled();
    expect(messageMock).toHaveBeenCalled();
  });

  it('not existing category should throw', async () => {
    categoriesRepositoryMock.findOne.mockImplementation(() =>
      Promise.resolve(null),
    );

    try {
      await service.create(finance.id, financeMessage.text);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
    }
  });
});
