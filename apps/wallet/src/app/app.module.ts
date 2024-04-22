import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';


@Module({
  imports: [WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
