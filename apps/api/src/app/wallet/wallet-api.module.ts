import { Module } from '@nestjs/common';
import { WalletApiController } from './wallet-api.controller';
import { WalletApiService } from './wallet-api.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WALLET_PACKAGE_NAME } from '@app/core';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/wallet.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [WalletApiController],
  providers: [WalletApiService],
})
export class WalletApiModule {}
