import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ConfigModule } from '@nestjs/config';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const categoriesRepositoryMock = {
    find: jest.fn(),
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
          entities: [Category],
        }),
        TypeOrmModule.forFeature([Category]),
      ],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: categoriesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('not existing category should throw', async () => {
    const mock = categoriesRepositoryMock.find.mockImplementation(() =>
      Promise.resolve([]),
    );

    const res = await service.get();
    expect(mock).toHaveBeenCalled();
    expect(res.length == 0).toBeTruthy();
  });
});
