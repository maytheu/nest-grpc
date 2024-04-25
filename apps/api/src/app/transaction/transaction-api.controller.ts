import { AuthGuard, RateDTO, TransactionDTO, UserInterceptor } from '@app/core';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionApiService } from './transaction-api.service';

@UseGuards(AuthGuard)
@UseInterceptors(UserInterceptor)
@Controller('transaction')
export class TransactionApiController {
  constructor(private transactionService: TransactionApiService) {}

  @Get('/transactions')
  async transactions(@Req() req: any) {
    return await this.transactionService.allTransaction(req.user);
  }

  @Post('/buy')
  async buyCurrency(@Body() data: TransactionDTO, @Req() req: any) {
    data.id = req.user.id;
    data.url = req.url.split('/')[3]
    return await this.transactionService.buyCurrency(data);
  }

  @Post('/sell')
  async sellCurrency(@Body() data: TransactionDTO, @Req() req: any) {    
    data.id = req.user.id;
    data.url = req.url.split('/')[3]
    return await this.transactionService.sellCurrency(data);
  } 
}
