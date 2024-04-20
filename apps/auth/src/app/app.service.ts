import { LoginDTO, SignupDTO, UserWithToken } from '@app/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async signup(data: SignupDTO): Promise<UserWithToken> {
    console.log(data);
    return { email: data.email, name: data.name, token: '' };
  }

  async login(data: LoginDTO): Promise<UserWithToken> {
    console.log(data);
    return { email: data.email, name: 'data.name', token: '' };
  }
}
