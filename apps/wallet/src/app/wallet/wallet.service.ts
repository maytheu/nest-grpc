import { CreditDTO, DebitDTO, Wallet } from '@app/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  async credit(data: CreditDTO): Promise<Wallet> {
    console.log('credit from wallet');
    return;
  }

  async debit(data: DebitDTO): Promise<Wallet> {
    return;
  }
}
