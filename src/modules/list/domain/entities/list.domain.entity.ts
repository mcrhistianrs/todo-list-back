type ListDomainEntityInput = {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: Date;
};

class ListDomainEntity {
  private constructor(private field: ListDomainEntityInput) {}

  static create(name: string, color: string, userId: string): ListDomainEntity {
    return new ListDomainEntity({
      id: crypto.randomUUID().toString(),
      name,
      color,
      userId,
      createdAt: new Date(),
    });
  }

  static load(input: ListDomainEntityInput): ListDomainEntity {
    return new ListDomainEntity(input);
  }

  getId(): string {
    return this.field.id;
  }

  getName(): string {
    return this.field.name;
  }

  getColor(): string {
    return this.field.color;
  }

  getUserId(): string {
    return this.field.userId;
  }

  getCreatedAt(): Date {
    return this.field.createdAt;
  }
}

export { ListDomainEntity };
