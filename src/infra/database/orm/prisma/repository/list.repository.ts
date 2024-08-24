import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateListInputDto,
  UpdateListInputDto,
} from '../../../../../modules/list/application/dto/list.input.dto';
import { ListDomainEntity } from '../../../../../modules/list/domain/entities/list.domain.entity';
import { ListDao } from '../dao/list.dao';
type ListRepositoryInterface = {
  create(input: CreateListInputDto): Promise<ListDomainEntity>;
  findAllByUserId(userId: string): Promise<ListDomainEntity[]>;
  update(input: UpdateListInputDto): Promise<ListDomainEntity>;
  delete(id: string): Promise<boolean>;
};
@Injectable()
class ListRepository implements ListRepositoryInterface {
  constructor(private listDao: ListDao) {}
  async delete(id: string): Promise<boolean> {
    try {
      await this.listDao.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async update(input: UpdateListInputDto): Promise<ListDomainEntity> {
    const { id, color, name } = input;
    const databaseEntity = await this.listDao.update(id, { color, name });
    return ListDomainEntity.load({
      id: databaseEntity.id,
      name: databaseEntity.name,
      color: databaseEntity.color,
      userId: databaseEntity.userId,
      createdAt: databaseEntity.createdAt,
    });
  }

  async create(input: CreateListInputDto): Promise<ListDomainEntity> {
    try {
      const databaseEntity = await this.listDao.create(input);
      return ListDomainEntity.load({
        id: databaseEntity.id,
        name: databaseEntity.name,
        color: databaseEntity.color,
        userId: databaseEntity.userId,
        createdAt: databaseEntity.createdAt,
      });
    } catch (error) {
      throw new BadRequestException('It was not possible to create the list');
    }
  }

  async findAllByUserId(userId: string): Promise<ListDomainEntity[]> {
    try {
      const databaseEntities = await this.listDao.findAllByUserId(userId);
      return databaseEntities.map((entity) =>
        ListDomainEntity.load({
          id: entity.id,
          name: entity.name,
          color: entity.color,
          userId: entity.userId,
          createdAt: entity.createdAt,
        }),
      );
    } catch (error) {
      throw new BadRequestException('It was not possible to retrieve lists');
    }
  }
}
export { ListRepository, ListRepositoryInterface };
