import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../infra/database/orm/prisma/repository/user.repository';
import { UserDomainEntity } from '../../domain/entities/user.domain.entity';
import { RetrieveUserByEmailInputDto } from '../dto/retrieve.user.by.email.input.dto';
@Injectable()
class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
  ) {}
  async retrieveByEmail(
    input: RetrieveUserByEmailInputDto,
  ): Promise<UserDomainEntity | null> {
    const { email } = input;
    const user = await this.userRepository.retrieveByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
export { UserService };
