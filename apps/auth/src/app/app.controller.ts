import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginDTO,
  SignupDTO,
  UserWithToken,
} from '@app/core';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController {
  constructor(private readonly appService: AppService) {}

  getData() {
    return this.appService.getData();
  }

  async signup(request: SignupDTO): Promise<UserWithToken> {
    return await this.appService.signup(request);
  }

  async login(request: LoginDTO): Promise<UserWithToken> {
    return await this.appService.login(request);
  }
}
