import { Inject, Injectable } from '@nestjs/common';
import { ListRepositoryInterface } from '../../../../../infra/database/orm/prisma/repository/list.repository';
import { CreateListInputDto } from '../../dto/list.input.dto';
@Injectable()
class CreateListUseCase {
  constructor(
    @Inject('ListRepositoryInterface')
    private listRepository: ListRepositoryInterface,
  ) {}
  async execute(input: CreateListInputDto) {
    const { name, color, user } = input;
    return this.listRepository.create({ name, color, user });
  }
}
export { CreateListUseCase };
