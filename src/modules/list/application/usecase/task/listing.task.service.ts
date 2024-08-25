import { Inject } from '@nestjs/common';
import { TaskDomainEntity } from 'src/modules/list/domain/entities/task.domain.entity';
import { TaskRepositoryInterface } from '../../../../../infra/database/orm/prisma/repository/task.repository';
import { ListingTaskInputDto } from '../../dto/task.input.dto';

class ListingTaskService {
  constructor(
    @Inject('TaskRepositoryInterface')
    private readonly taskRepository: TaskRepositoryInterface,
  ) {}

  async execute(input: ListingTaskInputDto): Promise<TaskDomainEntity[]> {
    const { listId } = input;
    return this.taskRepository.findAllByListId(listId);
  }
}
export { ListingTaskService };
