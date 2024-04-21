import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginDTO,
  SignupDTO,
  UserWithToken,
} from '@app/core';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async signup(request: SignupDTO): Promise<UserWithToken> {
    return await this.authService.signup(request);
  }

  async login(request: LoginDTO): Promise<UserWithToken> {
    return await this.authService.login(request);
  }
}
