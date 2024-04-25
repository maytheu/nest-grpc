import {
  RATE_PACKAGE_NAME,
  RATE_SERVICE_NAME,
  RateDTO,
  RateServiceClient,
  Transaction,
  TransactionDTO,
  TransactionEntity,
  Transactions,
  User,
  UserDTO,
  WalletEntity,
} from '@app/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { firstValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService implements OnModuleInit {
  private rateService: RateServiceClient;

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(User) userRepository: Repository<User>,
    @Inject(RATE_PACKAGE_NAME) private rateClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.rateService =
      this.rateClient.getService<RateServiceClient>(RATE_SERVICE_NAME);
  }

  async transactions(user: UserDTO): Promise<Transactions> {
    try {
      const userId = ObjectId.createFromHexString(user.id);
      const transactions = await this.transactionRepository.find({
        where: { userId },
        select: ['amount', 'currencyFrom', 'currencyTo', 'type'],
      });
      const allTransactions: Transaction[] = transactions.map((txn) => ({
        currencyFrom: txn.currencyFrom,
        currencyTo: txn.currencyTo,
        amount: txn.amount,
        type: txn.type,
      }));
      return { Transactions: allTransactions };
    } catch (error) {}
  }

  async buyCurrencyPair(data: TransactionDTO): Promise<Transaction> {
    try {
      const { currency, id, url } = data;

      const userId = ObjectId.createFromHexString(id);
      const wallet = await this.walletRepository.findOneBy({ userId });

      const rate: RateDTO = {
        currencyFrom: wallet.currency,
        currencyTo: currency,
        amount: wallet.amount,
      };
      const currencyFrom = wallet.currency;

      const res = await firstValueFrom(
        this.rateService
          .exchangeRate(rate)
          .pipe(map((res) => ({ result: res.result })))
      );

      const transactionData = {
        userId,
        currencyFrom,
        currencyTo: currency,
        type: url,
        amount: res.result,
      };
      wallet.amount = res.result;

      wallet.currency = currency;
      await Promise.all([
        this.transactionRepository.save(transactionData),
        this.walletRepository.save(wallet),
      ]);
      return {
        currencyFrom,
        currencyTo: currency,
        amount: res.result,
        type: url,
      };
    } catch (error) {}
  }
}
