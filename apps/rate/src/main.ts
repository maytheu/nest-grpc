/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RATE_PACKAGE_NAME } from '@app/core';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config()
  const app = NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: RATE_PACKAGE_NAME,
      protoPath: './proto/rate.proto',
      url: 'localhost:3004',
    },
  });

  (await app).listen();
}

bootstrap();
