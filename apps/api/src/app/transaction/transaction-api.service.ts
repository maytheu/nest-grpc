import {
  RATE_PACKAGE_NAME,
  RATE_SERVICE_NAME,
  RateDTO,
  RateServiceClient,
  TRANSACTION_PACKAGE_NAME,
  TRANSACTTION_SERVICE_NAME,
  TransactionDTO,
  TransacttionServiceClient,
  UserDTO,
} from '@app/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TransactionApiService implements OnModuleInit {
  private transactionService: TransacttionServiceClient;
  private rateService: RateServiceClient;

  constructor(
    @Inject(TRANSACTION_PACKAGE_NAME) private transactionClient: ClientGrpc,
    @Inject(RATE_PACKAGE_NAME) private rateClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.transactionService =
      this.transactionClient.getService<TransacttionServiceClient>(
        TRANSACTTION_SERVICE_NAME
      );
    this.rateService =
      this.rateClient.getService<RateServiceClient>(RATE_SERVICE_NAME);
  }

  async buyCurrency(data: TransactionDTO) {
    return await this.transactionService.buyCurrency(data);
  }

  async sellCurrency(data: TransactionDTO) {
    return await this.transactionService.sellCurrency(data);
  }

  async allTransaction(user: UserDTO) {
    return await this.transactionService.allTransactions(user);
  }

}
