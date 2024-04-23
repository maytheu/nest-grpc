import {
  Body,
  Controller,
  Get,
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

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  async walletBalance(@Req() req: any) {    
    return await this.walletService.balance(req.user);
  }

  @Post('/credit')
  async creditWallet(@Body() data: CreditDTO) {
    return await this.walletService.creditWallet(data);
  }
  @Post('/debit')
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  async debitWallet(@Body() data: DebitDTO, @Req() req: any) {
    data.id = req.user.id;
    return await this.walletService.debitWallet(data);
  }
}
