import {
  RATE_PACKAGE_NAME,
  RATE_SERVICE_NAME,
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
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService implements OnModuleInit {
  private rateService: RateServiceClient;

  constructor(
    @Inject(RATE_PACKAGE_NAME) private rateClient: ClientGrpc,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(User) userRepository: Repository<User>
  ) {}

  onModuleInit() {
    this.rateService =
      this.rateClient.getService<RateServiceClient>(RATE_SERVICE_NAME);
  }

  async transactions(user: UserDTO): Promise<TransactionEntity[]> {
    try {
      const userId = ObjectId.createFromHexString(user.id);
      const transactions = await this.transactionRepository.find({
        where: { userId },
        select: ['amount', 'currencyFrom', 'currencyTo', 'type'],
      });
      return transactions;
    } catch (error) {}
  }

  async buyCurrencyPair(data: TransactionDTO): Promise<Transaction> {
    try {
      const { currencyFrom, currencyTo, amount, id } = data;
      const conversion = this.rateService.exchangeRate({
        currencyFrom,
        currencyTo,
        amount,
      });
      const userId = ObjectId.createFromHexString(id);
      return;
    } catch (error) {}
  }
}
