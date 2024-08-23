import { Module } from '@nestjs/common';
import { UserDao } from '../../infra/database/orm/prisma/dao/user.dao';
import { UserRepository } from '../../infra/database/orm/prisma/repository/user.repository';
import { PrismaService } from '../../infra/database/orm/prisma/service/prisma.service';
import { UserService } from './application/service/user.service';

@Module({
  controllers: [],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserDao,
    PrismaService,
  ],
  exports: [UserService],
})
export class UserModule {}
