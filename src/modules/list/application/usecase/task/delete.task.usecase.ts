import { Inject } from '@nestjs/common';
import { TaskRepositoryInterface } from 'src/infra/database/orm/prisma/repository/task.repository';
import { DeleteTaskInputDto } from '../../dto/task.input.dto';

class DeleteTaskUseCase {
  constructor(
    @Inject('TaskRepositoryInterface')
    private taskRepository: TaskRepositoryInterface,
  ) {}

  async execute(input: DeleteTaskInputDto): Promise<boolean> {
    const { id } = input;
    return await this.taskRepository.delete(id);
  }
}
export { DeleteTaskUseCase };
