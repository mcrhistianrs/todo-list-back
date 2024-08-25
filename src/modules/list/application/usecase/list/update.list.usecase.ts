import { Inject } from '@nestjs/common';
import { ListRepositoryInterface } from '../../../../../infra/database/orm/prisma/repository/list.repository';
import { ListDomainEntity } from '../../../domain/entities/list.domain.entity';
import { UpdateListInputDto } from '../../dto/list.input.dto';

class UpdateListUseCase {
  constructor(
    @Inject('ListRepositoryInterface')
    private listRepository: ListRepositoryInterface,
  ) {}

  async execute(input: UpdateListInputDto): Promise<ListDomainEntity> {
    const { id, name, color } = input;
    return await this.listRepository.update({ id, name, color });
  }
}
export { UpdateListUseCase };
