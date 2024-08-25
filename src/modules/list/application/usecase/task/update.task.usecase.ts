import { Inject } from '@nestjs/common';
import { TaskRepositoryInterface } from 'src/infra/database/orm/prisma/repository/task.repository';
import { TaskDomainEntity } from 'src/modules/list/domain/entities/task.domain.entity';
import { UpdateTaskInputDto } from '../../dto/task.input.dto';

class UpdateTaskUseCase {
  constructor(
    @Inject('TaskRepositoryInterface')
    private readonly taskRepository: TaskRepositoryInterface,
  ) {}

  async execute(input: UpdateTaskInputDto): Promise<TaskDomainEntity> {
    return await this.taskRepository.update(input);
  }
}
export { UpdateTaskUseCase };
