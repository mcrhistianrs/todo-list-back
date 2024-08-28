import { Test, TestingModule } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { Client } from 'pg';
import { ListDao } from '../../../../../infra/database/orm/prisma/dao/list.dao';
import { ListRepository } from '../../../../../infra/database/orm/prisma/repository/list.repository';
import { PrismaService } from '../../../../../infra/database/orm/prisma/service/prisma.service';
import { CreateListInputDto } from '../../dto/list.input.dto';
import { CreateListUseCase } from './create.list.usecase';

jest.setTimeout(60000);

describe('Main Flow - Create List Use Case', () => {
  let sut: CreateListUseCase;
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  let postgresClient: Client;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    process.env.DATABASE_URL = container.getConnectionUri();
    postgresClient = new Client({
      connectionString: container.getConnectionUri(),
    });
    await postgresClient.connect();
    execSync('npm run prisma:migrate:deploy', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });
    execSync('npm run prisma:seed', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateListUseCase,
        PrismaService,
        ListDao,
        {
          provide: 'ListRepositoryInterface',
          useClass: ListRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateListUseCase>(CreateListUseCase);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await postgresClient.end();
    await container.stop();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a list without tasks', async () => {
    const user = await prismaService.user.findMany();
    const input = {
      name: 'List 1',
      color: 'blue',
      user: user[0].id,
    } as CreateListInputDto;

    const result = await sut.execute(input);

    expect(result.getName()).toBe('List 1');
    expect(result.getColor()).toBe('blue');
    expect(result.getUserId()).toBe(user[0].id);
  });
});
