import { Inject, Injectable } from '@nestjs/common';
import { ListRepositoryInterface } from '../../../../../infra/database/orm/prisma/repository/list.repository';
import { ListAllListsInputDto } from '../../dto/list.input.dto';
@Injectable()
class ListAllListUseCase {
  constructor(
    @Inject('ListRepositoryInterface')
    private listRepository: ListRepositoryInterface,
  ) {}
  async execute(input: ListAllListsInputDto) {
    const { id } = input;
    return this.listRepository.findAllByUserId(id);
  }
}
export { ListAllListUseCase };
