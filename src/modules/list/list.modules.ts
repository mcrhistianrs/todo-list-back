import { Module } from '@nestjs/common';
import { ListDao } from '../../infra/database/orm/prisma/dao/list.dao';
import { TaskDao } from '../../infra/database/orm/prisma/dao/task.dao';
import { ListRepository } from '../../infra/database/orm/prisma/repository/list.repository';
import { TaskRepository } from '../../infra/database/orm/prisma/repository/task.repository';
import { PrismaService } from '../../infra/database/orm/prisma/service/prisma.service';
import { ListController } from './application/controller/list.controller';
import { TaskController } from './application/controller/task.controller';
import { ListingTaskService } from './application/service/listing.task.service';
import { CreateListUseCase } from './application/usecase/list/create.list.usecase';
import { DeleteListUseCase } from './application/usecase/list/delete.list.usecase';
import { ListAllListUseCase } from './application/usecase/list/list.all.usecase';
import { UpdateListUseCase } from './application/usecase/list/update.list.usecase';
import { TaskCreateUseCase } from './application/usecase/task/create.task.usecase';
import { DeleteTaskUseCase } from './application/usecase/task/delete.task.usecase';
import { UpdateTaskUseCase } from './application/usecase/task/update.task.usecase';

@Module({
  controllers: [ListController, TaskController],
  providers: [
    CreateListUseCase,
    ListAllListUseCase,
    UpdateListUseCase,
    DeleteListUseCase,
    TaskCreateUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    ListingTaskService,
    {
      provide: 'ListRepositoryInterface',
      useClass: ListRepository,
    },
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskRepository,
    },
    ListDao,
    TaskDao,
    PrismaService,
  ],
  exports: [],
})
export class ListModule {}
