import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateTaskInputDto,
  ListingTaskInputDto,
  UpdateTaskInputDto,
} from '../dto/task.input.dto';
import { ListingTaskService } from '../service/listing.task.service';
import { TaskCreateUseCase } from '../usecase/task/create.task.usecase';
import { UpdateTaskUseCase } from '../usecase/task/update.task.usecase';
@Controller('task')
export class TaskController {
  constructor(
    private taskCreateUseCase: TaskCreateUseCase,
    private listingTaskService: ListingTaskService,
    private updateTaskUseCase: UpdateTaskUseCase,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() input: CreateTaskInputDto) {
    return await this.taskCreateUseCase.execute(input);
  }
  @HttpCode(HttpStatus.OK)
  @Get('all/:id')
  async listAll(@Param() input: ListingTaskInputDto) {
    return await this.listingTaskService.execute(input);
  }
  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(@Body() input: UpdateTaskInputDto) {
    return await this.updateTaskUseCase.execute(input);
  }
}
