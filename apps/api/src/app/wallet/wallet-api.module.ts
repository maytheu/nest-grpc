import { Module } from '@nestjs/common';
import { WalletApiController } from './wallet-api.controller';
import { WalletApiService } from './wallet-api.service';

@Module({
  controllers: [WalletApiController],
  providers: [WalletApiService],
})
export class WalletApiModule {}
