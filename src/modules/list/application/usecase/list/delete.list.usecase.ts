import { Inject } from '@nestjs/common';
import { ListRepositoryInterface } from '../../../../../infra/database/orm/prisma/repository/list.repository';

class DeleteListUseCase {
  constructor(
    @Inject('ListRepositoryInterface')
    private listRepository: ListRepositoryInterface,
  ) {}
  async execute(input: string): Promise<boolean> {
    return await this.listRepository.delete(input);
  }
}
export { DeleteListUseCase };
