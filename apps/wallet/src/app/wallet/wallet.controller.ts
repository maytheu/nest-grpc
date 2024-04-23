import {
  CreditDTO,
  DebitDTO,
  UserDTO,
  Wallet,
  WalletServiceController,
  WalletServiceControllerMethods,
} from '@app/core';
import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Observable } from 'rxjs';

@Controller()
@WalletServiceControllerMethods()
export class WalletController implements WalletServiceController {
  constructor(private readonly walletService: WalletService) {}

  async credit(request: CreditDTO): Promise<Wallet> {
    return this.walletService.credit(request);
  }

  async debit(request: DebitDTO): Promise<Wallet> {
    return this.walletService.debit(request);
  }
  async balance(request: UserDTO): Promise<Wallet> {
    return await this.walletService.balance(request);
  }
}
