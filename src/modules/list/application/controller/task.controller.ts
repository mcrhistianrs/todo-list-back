import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTaskInputDto, ListingTaskInputDto } from '../dto/task.input.dto';
import { TaskCreateUseCase } from '../usecase/task/create.task.usecase';
import { ListingTaskService } from '../usecase/task/listing.task.service';
@Controller('task')
export class TaskController {
  constructor(
    private taskCreateUseCase: TaskCreateUseCase,
    private listingTaskService: ListingTaskService,
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
}
