import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  MongodbModule,
  RATE_PACKAGE_NAME,
  TransactionEntity,
  User,
  WalletEntity,
} from '@app/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    MongodbModule,
    TypeOrmModule.forFeature([User, WalletEntity, TransactionEntity]),
    ClientsModule.register([
      {
        name: RATE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: RATE_PACKAGE_NAME,
          protoPath: './proto/rate.proto',
          url: 'localhost:3004',
        },
      },
    ]),
  ],
})
export class TransactionModule {}
