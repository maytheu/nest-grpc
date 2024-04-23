import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WalletApiService } from './wallet-api.service';
import { AuthGuard, CreditDTO, DebitDTO, UserInterceptor } from '@app/core';

@Controller('wallet')
export class WalletApiController {
  constructor(private readonly walletService: WalletApiService) {}

  @Post('/credit')
  async creditWallet(@Body() data: CreditDTO) {
    return await this.walletService.creditWallet(data);
  }
  @Post('/debit')
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  async debitWallet(@Body() data: DebitDTO, @Req() req: any) {
    data.id = req.id;
    return await this.walletService.debitWallet(data);
  }
}
