import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { Repository } from 'typeorm';
import { TransactionEntity, User, WalletEntity } from '@app/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

class MockRepository extends Repository<any> {}

describe('WalletService', () => {
  let service: WalletService;
  let userRepository: Repository<User>;
  let walletRepository: Repository<WalletEntity>;
  let transactionRepository: Repository<TransactionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: 'UserRepository',
          useClass: MockRepository,
        },
        {
          provide: 'WalletEntityRepository',
          useClass: MockRepository,
        },
        {
          provide: 'TransactionEntityRepository',
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    userRepository = module.get('UserRepository');
    walletRepository = module.get('WalletEntityRepository');
    transactionRepository = module.get('TransactionEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Credit', () => {
    it('should credit balance for a user', async () => {
      const mockCreditDTO = {
        status: true,
        email: 'test@example.com',
        amount: 100,
      };
      const mockUser: any = {
        id: new ObjectId(),
      };
      const mockWallet: any = {
        userId: mockUser.id,
        amount: 50,
      };
      const mockTransactionData: any = {
        userId: mockUser.id,
        amount: mockCreditDTO.amount,
        type: 'credit',
        currencyFrom: 'NGN',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);
      jest
        .spyOn(walletRepository, 'findOneBy')
        .mockResolvedValueOnce(mockWallet);
      jest.spyOn(walletRepository, 'save').mockResolvedValueOnce(mockWallet);
      jest
        .spyOn(transactionRepository, 'save')
        .mockResolvedValueOnce(mockTransactionData);

      const result = await service.credit(mockCreditDTO);

      expect(result).toEqual({
        balance: 150,
      });
    });

    it('should throw error if payment status is false', async () => {
      const mockCreditDTO = {
        status: false,
        email: 'test@example.com',
        amount: 100,
      };

      await expect(service.credit(mockCreditDTO)).rejects.toThrow(
        '402-Payment cannot be confirmed'
      );
    });

    it('should throw error if user not found', async () => {
      const mockCreditDTO = {
        status: true,
        email: 'test@example.com',
        amount: 100,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.credit(mockCreditDTO)).rejects.toThrow(
        '404-User not found'
      );
    });
  });

  describe('Debit', () => {
    it('should debit from user balance', async () => {
      const mockUser: any = {
        id: new ObjectId().toHexString(),
      };
      const mockWallet: any = {
        userId: mockUser.id,
        amount: 50,
      };
      const mockDebitDTO = {
        account: '',
        bank: '',
        amount: 20,
        id: mockUser.id,
      };
      const mockTransactionData: any = {
        userId: mockUser.id,
        amount: mockDebitDTO.amount,
        type: 'debit',
        currencyFrom: 'NGN',
      };

      jest
        .spyOn(walletRepository, 'findOneBy')
        .mockResolvedValueOnce(mockWallet);
      jest.spyOn(walletRepository, 'save').mockResolvedValueOnce(mockWallet);
      jest
        .spyOn(transactionRepository, 'save')
        .mockResolvedValueOnce(mockTransactionData);

      const result = await service.debit(mockDebitDTO);

      expect(result).toEqual({
        balance: 30,
      });
    });

    it('should throw an error when amount to debit is gretaer than available', async () => {
      const mockUser: any = {
        id: new ObjectId().toHexString(),
      };
      const mockWallet: any = {
        userId: mockUser.id,
        amount: 50,
      };
      const mockDebitDTO = {
        account: '',
        bank: '',
        amount: 60,
        id: mockUser.id,
      };

      jest
        .spyOn(walletRepository, 'findOneBy')
        .mockResolvedValueOnce(mockWallet);

      expect(service.debit(mockDebitDTO)).rejects.toThrow(
        '402-You can not shew more than you can swallow'
      );
    });
  });

  describe('Balance', () => {
    it('should return user wallet balance', async () => {
      const mockUser: any = {
        id: new ObjectId().toHexString(),
      };
      const mockWallet: any = {
        userId: mockUser.id,
        amount: 50,
      };

      jest
        .spyOn(walletRepository, 'findOneBy')
        .mockResolvedValueOnce(mockWallet);

      const result = await service.balance(mockUser);

      expect(result.balance).toBe(mockWallet.amount);
    });
  });
});
