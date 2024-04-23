import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';


@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
