import { Module } from '@nestjs/common';
import { ListDao } from '../../infra/database/orm/prisma/dao/list.dao';
import { ListRepository } from '../../infra/database/orm/prisma/repository/list.repository';
import { PrismaService } from '../../infra/database/orm/prisma/service/prisma.service';
import { ListController } from './application/controller/list.controller';
import { CreateListUseCase } from './application/usecase/create.list.usecase';
import { DeleteListUseCase } from './application/usecase/delete.list.usecase';
import { ListAllListUseCase } from './application/usecase/list.all.usecase';
import { UpdateListUseCase } from './application/usecase/update.list.usecase';

@Module({
  controllers: [ListController],
  providers: [
    CreateListUseCase,
    ListAllListUseCase,
    UpdateListUseCase,
    DeleteListUseCase,
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
