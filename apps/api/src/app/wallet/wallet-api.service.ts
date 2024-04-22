import {
  CreditDTO,
  DebitDTO,
  WALLET_PACKAGE_NAME,
  WALLET_SERVICE_NAME,
  WalletServiceClient,
} from '@app/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class WalletApiService implements OnModuleInit {
  private walletService: WalletServiceClient;

  constructor(@Inject(WALLET_PACKAGE_NAME) private walletClient: ClientGrpc) {}

  onModuleInit() {
    this.walletService =
      this.walletClient.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  async creditWallet(data: CreditDTO) {
    return await this.walletService.credit(data);
  }

  async debitWallet(data: DebitDTO) {
    return await this.walletService.debit(data);
  }
}
