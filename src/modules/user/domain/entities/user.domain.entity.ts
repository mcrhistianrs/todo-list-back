export type UserDomainEntityInput = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

class UserDomainEntity {
  private constructor(private field: UserDomainEntityInput) {}
  static create(
    name: string,
    email: string,
    password: string,
  ): UserDomainEntity {
    return new UserDomainEntity({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password,
      created_at: new Date(),
    });
  }
  static load(input: UserDomainEntityInput): UserDomainEntity {
    return new UserDomainEntity(input);
  }
  getName(): string {
    return this.field.name;
  }
  getEmail(): string {
    return this.field.email;
  }
  getId(): string {
    return this.field.id;
  }
  getPassword(): string {
    return this.field.password;
  }
  getCreatedAt(): Date {
    return this.field.created_at;
  }
}
export { UserDomainEntity };
