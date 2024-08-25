import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../service/prisma.service';

interface TaskDAOInterface {
  create(input: Partial<Task>): Promise<Task>;
  findAllByListId(listId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, data: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}

@Injectable()
class TaskDao implements TaskDAOInterface {
  constructor(private prismaService: PrismaService) {}

  async create(input: Partial<Task>): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        name: input.name,
        completed: input.completed ?? false,
        listId: input.listId,
      },
    });
  }

  async findAllByListId(listId: string): Promise<Task[]> {
    return this.prismaService.task.findMany({
      where: { listId },
    });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    return this.prismaService.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id },
    });
  }
}

export { TaskDao, TaskDAOInterface };
