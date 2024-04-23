import { Module } from '@nestjs/common';
import { TransactionApiController } from './transaction-api.controller';
import { TransactionApiService } from './transaction-api.service';

@Module({
  controllers: [TransactionApiController],
  providers: [TransactionApiService],
})
export class TransactionApiModule {}
