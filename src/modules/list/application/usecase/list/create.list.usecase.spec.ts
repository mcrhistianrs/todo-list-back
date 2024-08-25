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
  let client: Client;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    // Override the DATABASE_URL environment variable for Prisma
    process.env.DATABASE_URL = container.getConnectionUri();

    // Connect to the database using pg client
    client = new Client({
      connectionString: container.getConnectionUri(),
    });
    await client.connect();

    // Optionally, run SQL commands to set up the database

    // await client.query(
    //   `CREATE TABLE "public"."User" (
    //   "id" TEXT NOT NULL,
    //   "name" TEXT NOT NULL,
    //   "email" TEXT NOT NULL,
    //   "password" TEXT NOT NULL,
    //   "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    //   CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    //   );
    //   CREATE UNIQUE INDEX "User_email_key"
    //   ON "public"."User" (
    //     "email" ASC
    //   );`,
    // );
    // await client.query(`
    //   CREATE TABLE "public"."List" (
    //   "id" TEXT NOT NULL,
    //   "name" TEXT NOT NULL,
    //   "color" TEXT NOT NULL,
    //   "userId" TEXT NOT NULL,
    //   "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    //   CONSTRAINT "List_pkey" PRIMARY KEY ("id")
    //   );`);
    // console.log((await client.query('SELECT * FROM "public"."List";')).rows);
    // Run the migrations
    execSync('npm run prisma:migrate:deploy', {
      env: {
        ...process.env, // Pass existing env vars
        DATABASE_URL: process.env.DATABASE_URL, // Ensure Prisma uses the Testcontainers DB
      },
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateListUseCase,
        ListRepository,
        ListDao,
        PrismaService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();
    sut = module.get<CreateListUseCase>(CreateListUseCase);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Clean up the database if necessary
    await client.query('DROP TABLE IF EXISTS test_table;');

    // Close the database connection
    await client.end();
    await container.stop();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a list without tasks', async () => {
    const input = {
      name: 'List 1',
      color: 'blue',
      user: 'e717a789-e158-473d-8b6f-38e3ec6a462b',
    } as CreateListInputDto;

    const result = await sut.execute(input);

    const output = {
      id: '4f434716-c482-49f8-aa36-370008f456fe',
      name: 'List 1',
      color: 'blue',
      userId: 'e717a789-e158-473d-8b6f-38e3ec6a462b',
      createdAt: '2024-08-23 17:49:58.679',
    };

    expect(result.getName()).toBe(output.name);
    expect(result.getColor()).toBe(output.color);
    expect(result.getUserId()).toBe(output.userId);
  });
});
