import { Module } from '@nestjs/common';
import { ListDao } from '../../infra/database/orm/prisma/dao/list.dao';
import { ListRepository } from '../../infra/database/orm/prisma/repository/list.repository';
import { PrismaService } from '../../infra/database/orm/prisma/service/prisma.service';
import { ListController } from './application/controller/list.controller';
import { CreateListUseCase } from './application/usecase/create.list.usecase';
import { ListAllListUseCase } from './application/usecase/list.all.usecase';

@Module({
  controllers: [ListController],
  providers: [
    CreateListUseCase,
    ListAllListUseCase,
    {
      provide: 'ListRepositoryInterface',
      useClass: ListRepository,
    },
    ListDao,
    PrismaService,
  ],
  exports: [],
})
export class ListModule {}
