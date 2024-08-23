import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateListUseCase } from '../usecase/create.list.usecase';
@Controller('list')
export class ListController {
  constructor(private readonly createListUseCase: CreateListUseCase) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() input: Record<string, any>) {
    return await this.createListUseCase.execute({
      name: input.name,
      color: input.color,
      user: input.user,
    });
  }
}
