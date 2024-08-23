import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthPresenter } from '../presenter/auth.presenter';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authPresenter: AuthPresenter,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() input: Record<string, any>) {
    const result = await this.authService.login(input.email, input.password);
    return this.authPresenter.present(result);
  }
}
