import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDomainEntity } from 'src/modules/user/domain/entities/user.domain.entity';
import { UserService } from '../../../../modules/user/application/service/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDomainEntity> {
    const user = await this.userService.retrieveByEmail({ email });
    if (user && bcrypt.compareSync(password, user.getPassword())) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string): Promise<any | null> {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload = {
        id: user.getId(),
      };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}
