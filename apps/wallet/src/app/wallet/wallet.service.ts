import { CreditDTO, DebitDTO, User, Wallet, WalletEntity } from '@app/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>
  ) {}
  async credit(data: CreditDTO): Promise<Wallet> {
    try {
      // a webhook api that verifies the payment system
      const { status, email, amount } = data;
      if (!status) return;

      const user = await this.userRepository.findOneBy({ email });
      if (user) return;

      const wallet = await this.walletRepository.findOne({
        where: { userId: user.id },
      });
      wallet.amount += amount;
      await Promise.all([this.walletRepository.save(wallet)]);
      return { balance: wallet.amount };
    } catch (error) {}
  }

  async debit(data: DebitDTO): Promise<Wallet> {
    try {
      const { account, bank, amount, id } = data;
      const userId = id as unknown as ObjectId;
      const wallet = await this.walletRepository.findOne({
        where: { userId },
      });
      if (amount > wallet.amount) return;

      // make transfer to bank
      wallet.amount -= amount;
      await Promise.all([this.walletRepository.save(wallet)]);
      return { balance: wallet.amount };
    } catch (error) {}
  }
}
