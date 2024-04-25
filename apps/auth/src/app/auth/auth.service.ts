import {
  LoginDTO,
  SignupDTO,
  User,
  UserWithToken,
  WalletEntity,
} from '@app/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private readonly jwtService: JwtService
  ) {}

  async signup(data: SignupDTO): Promise<UserWithToken> {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new RpcException('409-Account already exist');

    const hashPassword = await this.hashPassword(password);
    data.password = hashPassword;
    const newUser = await this.userRepository.save(data);
    await this.walletRepository.save({
      userId: newUser.id,
      amount: 0,
      currency: 'USD',
    });

    const token = await this.jwtService.signAsync({ id: newUser.id });
    return { email: data.email, name: data.name, token };
  }

  async login(data: LoginDTO): Promise<UserWithToken> {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new RpcException('401-Invalid Credentials');

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new RpcException('401-Invalid Credentials');

    const token = await this.jwtService.signAsync({ id: user.id });

    return { email: data.email, name: user.name, token };
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
