import { Injectable } from '@nestjs/common';
@Injectable()
class AuthPresenter {
  present(input: string) {
    return {
      token: input,
    };
  }
}
export { AuthPresenter };
