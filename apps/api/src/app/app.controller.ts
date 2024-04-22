import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { LoginDTO, SignupDTO } from '@app/core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/signup')
  async signup(@Body() data: SignupDTO) {
    return await this.appService.signup(data);
  }

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    return await this.appService.login(data);
  }

  @Get('/wallet/credit')
  async creditWallet() {
    return await this.appService.creditWallet();
  }
}
