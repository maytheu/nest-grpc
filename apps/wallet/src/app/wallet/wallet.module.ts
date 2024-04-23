import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import {
  MongodbModule,
  TransactionEntity,
  User,
  WalletEntity,
} from '@app/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    MongodbModule,
    TypeOrmModule.forFeature([WalletEntity, User]),
  ],
})
export class WalletModule {}
