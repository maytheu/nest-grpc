import { LoginDTO, SignupDTO, User, UserWithToken } from '@app/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async signup(data: SignupDTO): Promise<UserWithToken> {
    const { email, password, name } = data;
    this.userRepository.save(data)
    return { email: data.email, name: data.name, token: '' };
  }

  async login(data: LoginDTO): Promise<UserWithToken> {
    console.log(data);
    return { email: data.email, name: 'data.name', token: '' };
  }

  private async findUser(email: string) {}
}
