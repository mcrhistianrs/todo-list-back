import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDomainEntity } from 'src/modules/user/domain/entities/user.domain.entity';
import { UserDao } from '../dao/user.dao';
@Injectable()
class UserRepository {
  constructor(private userDao: UserDao) {}
  async retrieveByEmail(input: string): Promise<UserDomainEntity> {
    try {
      const databaseEntity = await this.userDao.findByEmail(input);
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

export { UserRepository };
