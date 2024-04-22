import { Module } from '@nestjs/common';
import { WalletApiController } from './wallet-api.controller';
import { WalletApiService } from './wallet-api.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WALLET_PACKAGE_NAME } from '@app/core';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/wallet.proto'),
        },
      },
    ]),
  ],
  controllers: [WalletApiController],
  providers: [WalletApiService],
})
export class WalletApiModule {}
