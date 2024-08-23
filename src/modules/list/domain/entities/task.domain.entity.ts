export type TaskDomainEntityInput = {
  id: string;
  name: string;
  completed: boolean;
  listId: string;
  createdAt: Date;
};

class TaskDomainEntity {
  private constructor(private field: TaskDomainEntityInput) {}

  static create(
    name: string,
    listId: string,
    completed = false,
  ): TaskDomainEntity {
    return new TaskDomainEntity({
      id: crypto.randomUUID().toString(),
      name,
      completed,
      listId,
      createdAt: new Date(),
    });
  }

  static load(input: TaskDomainEntityInput): TaskDomainEntity {
    return new TaskDomainEntity(input);
  }

  getId(): string {
    return this.field.id;
  }

  getName(): string {
    return this.field.name;
  }

  isCompleted(): boolean {
    return this.field.completed;
  }

  getListId(): string {
    return this.field.listId;
  }

  getCreatedAt(): Date {
    return this.field.createdAt;
  }

  markAsCompleted(): void {
    this.field.completed = true;
  }

  markAsIncomplete(): void {
    this.field.completed = false;
  }
  getCompleted(): boolean {
    return this.field.completed;
  }
}

export { TaskDomainEntity };
