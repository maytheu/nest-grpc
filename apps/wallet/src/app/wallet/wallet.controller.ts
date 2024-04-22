import {
  Empty,
  Test,
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

  async credit(): Promise<Test> {
    return await this.walletService.credit();
  }
}
