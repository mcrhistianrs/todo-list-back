import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTaskInputDto } from '../dto/task.input.dto';
import { TaskCreateUseCase } from '../usecase/task/create.task.usecase';
@Controller('task')
export class TaskController {
  constructor(private taskCreateUseCase: TaskCreateUseCase) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() input: CreateTaskInputDto) {
    return await this.taskCreateUseCase.execute(input);
  }
}
