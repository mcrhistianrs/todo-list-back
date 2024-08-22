import { User } from '@prisma/client';
import { UserDomainEntity } from '../../../../../modules/user/domain/entities/user.domain.entity';

export class UserMapper {
  static toDomainEntity(user: User): UserDomainEntity {
    return UserDomainEntity.load({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.createdAt,
    });
  }

  static toDatabaseEntity(user: UserDomainEntity): User {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
    } as User;
  }
}
