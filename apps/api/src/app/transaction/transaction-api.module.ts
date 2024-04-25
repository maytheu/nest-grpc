import { Module } from '@nestjs/common';
import { TransactionApiController } from './transaction-api.controller';
import { TransactionApiService } from './transaction-api.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RATE_PACKAGE_NAME, TRANSACTION_PACKAGE_NAME } from '@app/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  controllers: [TransactionApiController],
  providers: [TransactionApiService],
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: TRANSACTION_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/transaction.proto'),
          url: 'localhost:3003',
        },
      },
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TransactionApiModule {}
