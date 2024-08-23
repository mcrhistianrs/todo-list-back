import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './application/controllers/auth.controller';
import { AuthPresenter } from './application/presenter/auth.presenter';
import { AuthService } from './application/services/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '60min' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthPresenter],
  exports: [],
})
export class AuthModule {}
