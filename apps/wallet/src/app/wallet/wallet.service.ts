import {
  CreditDTO,
  DebitDTO,
  TransactionEntity,
  User,
  UserDTO,
  Wallet,
  WalletEntity,
} from '@app/core';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>
  ) {}
  async credit(data: CreditDTO): Promise<Wallet> {
    try {
      // a webhook api that verifies the payment system
      const { status, email, amount } = data;
      if (!status) throw new RpcException('402-Payment cannot be confirmed');

      const user = await this.userRepository.findOneBy({ email });
      if (!user) throw new RpcException('404-User not found');

      const wallet = await this.walletRepository.findOneBy({ userId: user.id });
      wallet.amount += amount;
      const txnData = {
        userId: user.id,
        amount,
        type: 'credit',
        currencyFrom: 'NGN',
      };
      await Promise.all([
        this.walletRepository.save(wallet),
        this.transactionRepository.save(txnData),
      ]);
      return { balance: wallet.amount };
    } catch (error) {
      throw new RpcException(`500-${error.message}`);
    }
  }

  async debit(data: DebitDTO): Promise<Wallet> {
    try {
      const { account, bank, amount, id } = data;
      const userId = ObjectId.createFromHexString(id);
      const wallet = await this.walletRepository.findOneBy({ userId });
      if (amount > wallet.amount)
        throw new RpcException(
          '402-You can not shew more than you can swallow'
        );

      // make transfer to bank
      wallet.amount -= amount;
      const txnData = { userId, amount, type: 'debit', currencyFrom: 'NGN' };
      await Promise.all([
        this.walletRepository.save(wallet),
        this.transactionRepository.save(txnData),
      ]);
      return { balance: wallet.amount };
    } catch (error) {
      throw new RpcException(`500-${error.message}`);
    }
  }

  async balance(user: UserDTO): Promise<Wallet> {
    try {
      const userId = ObjectId.createFromHexString(user.id);
      const wallet = await this.walletRepository.findOneBy({ userId });
      return { balance: wallet.amount };
    } catch (error) {
      throw new RpcException(`500-${error.message}`);
    }
  }
}
