import { Inject } from '@nestjs/common';
import { TaskRepositoryInterface } from 'src/infra/database/orm/prisma/repository/task.repository';
import { CreateTaskInputDto } from '../../dto/task.input.dto';
class TaskCreateUseCase {
  constructor(
    @Inject('TaskRepositoryInterface')
    private taskRepository: TaskRepositoryInterface,
  ) {}
  async execute(input: CreateTaskInputDto) {
    return this.taskRepository.create(input);
  }
}
export { TaskCreateUseCase };
