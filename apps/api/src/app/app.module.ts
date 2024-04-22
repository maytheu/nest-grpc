import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, WALLET_PACKAGE_NAME } from '@app/core';
import { join } from 'path';
import { WalletApiModule } from './wallet/wallet-api.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/auth.proto'),
        },
      },
      {
        name: WALLET_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/wallet.proto'),
        },
      },
    ]),
    WalletApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
