import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ListAllListsInputDto } from '../dto/list.input.dto';
import { CreateListUseCase } from '../usecase/create.list.usecase';
import { ListAllListUseCase } from '../usecase/list.all.usecase';
@Controller('list')
export class ListController {
  constructor(
    private readonly createListUseCase: CreateListUseCase,
    private readonly listAllListUseCase: ListAllListUseCase,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() input: Record<string, any>) {
    return await this.createListUseCase.execute({
      name: input.name,
      color: input.color,
      user: input.user,
    });
  }
  @HttpCode(HttpStatus.OK)
  @Get('all/:id')
  async listAll(@Body() input: ListAllListsInputDto) {
    return await this.listAllListUseCase.execute(input);
  }
}
