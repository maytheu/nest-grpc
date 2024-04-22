import { Test } from '@app/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  async credit():Promise<Test> {
    console.log('credit from wallet');
    return;
  }
}
