import { BadRequestException, Injectable } from '@nestjs/common';

import { TaskDomainEntity } from '../../../../../modules/list/domain/entities/task.domain.entity';

import {
  CreateTaskInputDto,
  UpdateTaskInputDto,
} from '../../../../../modules/list/application/dto/task.input.dto';
import { TaskDao } from '../dao/task.dao';

type TaskRepositoryInterface = {
  create(input: CreateTaskInputDto): Promise<TaskDomainEntity>;
  findAllByListId(listId: string): Promise<TaskDomainEntity[]>;
  update(input: UpdateTaskInputDto): Promise<TaskDomainEntity>;
  delete(id: string): Promise<boolean>;
};

@Injectable()
class TaskRepository implements TaskRepositoryInterface {
  constructor(private taskDao: TaskDao) {}

  async create(input: CreateTaskInputDto): Promise<TaskDomainEntity> {
    try {
      const databaseEntity = await this.taskDao.create(input);
      return TaskDomainEntity.load({
        id: databaseEntity.id,
        name: databaseEntity.name,
        completed: databaseEntity.completed,
        listId: databaseEntity.listId,
        createdAt: databaseEntity.createdAt,
      });
    } catch (error) {
      throw new BadRequestException('It was not possible to create the task');
    }
  }

  async findAllByListId(listId: string): Promise<TaskDomainEntity[]> {
    try {
      const databaseEntities = await this.taskDao.findAllByListId(listId);
      return databaseEntities.map((entity) =>
        TaskDomainEntity.load({
          id: entity.id,
          name: entity.name,
          completed: entity.completed,
          listId: entity.listId,
          createdAt: entity.createdAt,
        }),
      );
    } catch (error) {
      throw new BadRequestException('It was not possible to retrieve tasks');
    }
  }

  async update(input: UpdateTaskInputDto): Promise<TaskDomainEntity> {
    const { id, name, completed } = input;
    const databaseEntity = await this.taskDao.update(id, { name, completed });
    return TaskDomainEntity.load({
      id: databaseEntity.id,
      name: databaseEntity.name,
      completed: databaseEntity.completed,
      listId: databaseEntity.listId,
      createdAt: databaseEntity.createdAt,
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.taskDao.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { TaskRepository, TaskRepositoryInterface };
