/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WALLET_PACKAGE_NAME } from '@app/core';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config()
  const app = NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: WALLET_PACKAGE_NAME,
      protoPath: './proto/wallet.proto',
      url: 'localhost:3002',
    },
  });

  (await app).listen();
}

bootstrap();
