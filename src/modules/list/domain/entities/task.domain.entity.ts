export type TaskDomainEntityInput = {
  id: string;
  name: string;
  completed: boolean;
  listId: string;
  createdAt: Date;
};

class TaskDomainEntity {
  private constructor(
    private id: string,
    private name: string,
    private completed: boolean,
    private listId: string,
    private createdAt: Date,
  ) {}

  static create(
    name: string,
    listId: string,
    completed = false,
  ): TaskDomainEntity {
    return new TaskDomainEntity(
      crypto.randomUUID().toString(),
      name,
      completed,
      listId,
      new Date(),
    );
  }

  static load(input: TaskDomainEntityInput): TaskDomainEntity {
    const { id, name, completed, listId, createdAt } = input;
    return new TaskDomainEntity(id, name, completed, listId, createdAt);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  getListId(): string {
    return this.listId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  markAsCompleted(): void {
    this.completed = true;
  }

  markAsIncomplete(): void {
    this.completed = false;
  }
  getCompleted(): boolean {
    return this.completed;
  }
}

export { TaskDomainEntity };
