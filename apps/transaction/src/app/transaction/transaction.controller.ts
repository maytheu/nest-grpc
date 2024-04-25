import {
  RateServiceControllerMethods,
  Transaction,
  TransactionDTO,
  Transactions,
  TransacttionServiceController,
  TransacttionServiceControllerMethods,
  UserDTO,
} from '@app/core';
import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Observable } from 'rxjs';

@Controller()
@TransacttionServiceControllerMethods()
export class TransactionController implements TransacttionServiceController {
  constructor(private transactionService: TransactionService) {}

  async buyCurrency(request: TransactionDTO): Promise<Transaction> {
    return await this.transactionService.buyCurrencyPair(request);
  }

  async sellCurrency(request: TransactionDTO): Promise<Transaction> {
    return await this.transactionService.buyCurrencyPair(request);
  }

  async allTransactions(request: UserDTO): Promise<Transactions> {
    return await this.transactionService.transactions(request);
  }
}
