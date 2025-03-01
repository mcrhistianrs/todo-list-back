import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDomainEntity } from '../../../../../modules/user/domain/entities/user.domain.entity';
import { UserDao } from '../dao/user.dao';
type UserRepositoryInterface = {
  retrieveByEmail(input: string): Promise<UserDomainEntity>;
};
@Injectable()
class UserRepository {
  constructor(private userDao: UserDao) {}
  async retrieveByEmail(input: string): Promise<UserDomainEntity> {
    try {
      const databaseEntity = await this.userDao.findByEmail(input);
      if (!databaseEntity) {
        throw new BadRequestException(
          'It was not possible to retrieve an user',
        );
      }
      return UserDomainEntity.load({
        id: databaseEntity.id,
        name: databaseEntity.name,
        email: databaseEntity.email,
        password: databaseEntity.password,
        created_at: databaseEntity.createdAt,
      });
    } catch (error) {
      throw new BadRequestException('It was not possible to retrieve an user');
    }
  }
}

export { UserRepository, UserRepositoryInterface };
