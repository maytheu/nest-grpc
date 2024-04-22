import { LoginDTO, SignupDTO, User, UserWithToken } from '@app/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signup(data: SignupDTO): Promise<UserWithToken> {
    const { email, password, name } = data;
    const user = await this.userRepository.findOneBy({ email });
    if (user) return;

    const hashPassword = await this.hashPassword(password);
    data.password = hashPassword;
    const newUser = await this.userRepository.save(data);

    const token = await this.jwtService.signAsync({ id: newUser.id });
    return { email: data.email, name: data.name, token };
  }

  async login(data: LoginDTO): Promise<UserWithToken> {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return;

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return;

    const token = await this.jwtService.signAsync({ id: user.id });

    return { email: data.email, name: 'user.name', token };
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
