import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [RateService],
  controllers: [RateController],
  imports: [
    ConfigModule.forRoot({ envFilePath: 'apps/rate/.env' }),
    HttpModule,
  ],
})
export class RateModule {}
