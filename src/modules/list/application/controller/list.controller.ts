import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ListAllListsInputDto,
  UpdateListInputDto,
} from '../dto/list.input.dto';
import { CreateListUseCase } from '../usecase/list/create.list.usecase';
import { DeleteListUseCase } from '../usecase/list/delete.list.usecase';
import { ListAllListUseCase } from '../usecase/list/list.all.usecase';
import { UpdateListUseCase } from '../usecase/list/update.list.usecase';
@Controller('list')
export class ListController {
  constructor(
    private readonly createListUseCase: CreateListUseCase,
    private readonly listAllListUseCase: ListAllListUseCase,
    private readonly updateListUseCase: UpdateListUseCase,
    private readonly deleteListUseCase: DeleteListUseCase,
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
  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(@Body() input: UpdateListInputDto) {
    return await this.updateListUseCase.execute(input);
  }
  @Delete(':id')
  async delete(@Param('id') input: string, @Res() res: Response) {
    const result = await this.deleteListUseCase.execute(input);

    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Failed to delete the list.',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'List deleted successfully.',
    });
  }
}
