type ListDomainEntityInput = {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: Date;
};

class ListDomainEntity {
  private constructor(
    private id: string,
    private name: string,
    private color: string,
    private userId: string,
    private createdAt: Date,
  ) {}

  static create(name: string, color: string, userId: string): ListDomainEntity {
    return new ListDomainEntity(
      crypto.randomUUID().toString(),
      name,
      color,
      userId,
      new Date(),
    );
  }

  static load(input: ListDomainEntityInput): ListDomainEntity {
    const { id, name, color, userId, createdAt } = input;
    return new ListDomainEntity(id, name, color, userId, createdAt);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getColor(): string {
    return this.color;
  }

  getUserId(): string {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}

export { ListDomainEntity };
