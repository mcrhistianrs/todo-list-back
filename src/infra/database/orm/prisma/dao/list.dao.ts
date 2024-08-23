import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { CreateListInputDto } from '../../../../../modules/list/application/dto/list.input.dto';
import { PrismaService } from '../service/prisma.service';

interface IListDao {
  create(input: CreateListInputDto): Promise<List>;
  findAllByUserId(userId: string): Promise<List[]>;
  findById(id: string): Promise<List | null>;
  update(id: string, data: Partial<List>): Promise<List>;
  delete(id: string): Promise<void>;
}

@Injectable()
class ListDao implements IListDao {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateListInputDto): Promise<List> {
    return this.prismaService.list.create({
      data: {
        name: input.name,
        color: input.color,
        userId: input.user,
        Task: undefined,
      },
    });
  }

  async findAllByUserId(userId: string): Promise<List[]> {
    return this.prismaService.list.findMany({
      where: { userId },
      include: { Task: true }, // Include tasks if needed
    });
  }

  async findById(id: string): Promise<List | null> {
    return this.prismaService.list.findUnique({
      where: { id },
      include: { Task: true }, // Include tasks if needed
    });
  }

  async update(id: string, data: Partial<List>): Promise<List> {
    return this.prismaService.list.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.list.delete({
      where: { id },
    });
  }
}

export { ListDao };
