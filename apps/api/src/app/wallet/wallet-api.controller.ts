import { Body, Controller, Post } from '@nestjs/common';
import { WalletApiService } from './wallet-api.service';
import { CreditDTO, DebitDTO } from '@app/core';

@Controller('wallet')
export class WalletApiController {
  constructor(private readonly walletService: WalletApiService) {}

  @Post('/credit')
  async creditWallet(@Body() data: CreditDTO) {
    return await this.walletService.creditWallet(data);
  }
  @Post('/debit')
  async debitWallet(@Body() data: DebitDTO) {
    return await this.walletService.debitWallet(data);
  }
}
