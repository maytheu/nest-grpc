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
import { join } from 'path';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    ClientsModule.register([
      {
        name: RATE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: RATE_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/rate.proto'),
          url: 'localhost:3004',
        },
      },
    ]),
    MongodbModule,
    TypeOrmModule.forFeature([User, WalletEntity, TransactionEntity]),
  ],
})
export class TransactionModule {}
