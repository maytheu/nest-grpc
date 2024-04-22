import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginDTO,
  SignupDTO,
  WALLET_PACKAGE_NAME,
  WALLET_SERVICE_NAME,
  WalletServiceClient,
} from '@app/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;
  private walletService: WalletServiceClient;

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private authClient: ClientGrpc,
    @Inject(WALLET_PACKAGE_NAME) private walletClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authServiceClient =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    this.walletService =
      this.walletClient.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async signup(data: SignupDTO) {
    return await this.authServiceClient.signup(data);
  }

  async login(data: LoginDTO) {
    return await this.authServiceClient.login(data);
  }

  async creditWallet() {
    return await this.walletService.credit('');
  }
}
