import { Test, TestingModule } from '@nestjs/testing';
import { UserDao } from '../../../../infra/database/orm/prisma/dao/user.dao';
import { UserRepository } from '../../../../infra/database/orm/prisma/repository/user.repository';
import { PrismaService } from '../../../../infra/database/orm/prisma/service/prisma.service';
import { UserDomainEntity } from '../../domain/entities/user.domain.entity';
import { RetrieveUserByEmailInputDto } from '../dto/retrieve.user.by.email.input.dto';
import { UserService } from './user.service';
describe('Main Flow - User Service', () => {
  let sut: UserService;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, UserDao, PrismaService],
    }).compile();
    sut = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should retrieve an user by email', async () => {
    const input = { email: 'any@email.com' } as RetrieveUserByEmailInputDto;
    const output = UserDomainEntity.create(
      'any_name',
      'any@email.com',
      'any_password',
    );
    jest.spyOn(userRepository, 'retrieveByEmail').mockResolvedValue(output);
    const result = await sut.retrieveByEmail(input);
    expect(result).toEqual(output);
  });
});
describe('Alternative Flow - User Service', () => {
  let sut: UserService;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, UserDao, PrismaService],
    }).compile();
    sut = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should not retrieve an user if occurs any problem', async () => {
    const input = { email: 'any@email.com' } as RetrieveUserByEmailInputDto;
    const output = null;
    jest.spyOn(userRepository, 'retrieveByEmail').mockResolvedValue(output);
    const result = await sut.retrieveByEmail(input);
    expect(result).toEqual(output);
  });
});
