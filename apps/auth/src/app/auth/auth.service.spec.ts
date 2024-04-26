import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User, WalletEntity } from '@app/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let walletRepository: Repository<WalletEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: getRepositoryToken(WalletEntity), useClass: Repository },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue('fakeToken') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    walletRepository = module.get(getRepositoryToken(WalletEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      const mockUser = new User();
      mockUser.email = 'test@example.com';
      mockData.name = 'Test User';
      mockData.password = 'hashedPassword';
      const mockWallet = new WalletEntity();
      mockWallet.userId = mockUser.id;
      mockWallet.amount = 0;
      mockWallet.currency = 'USD';

      const mockToken = 'fakeToken';
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser);
      jest.spyOn(walletRepository, 'save').mockResolvedValueOnce(mockWallet);

      const result = await service.signup(mockData);

      expect(result).toEqual({
        email: mockData.email,
        name: mockData.name,
        token: mockToken,
      });
    });

    it('should throw an error if the email already exists', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce({
        email: 'test@example.com',
      } as User);

      await expect(service.signup(mockData)).rejects.toThrow(
        '409-Account already exist'
      );
    });
  });

  describe('login', () => {
    it('should return a token if the credentials are valid', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      const mockUser = new User();
      mockUser.email = 'test@example.com';
      mockData.name = 'Test User';
      mockData.password = await bcrypt.hash('password123', 10);
      const mockToken = 'fakeToken';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.login(mockData);

      expect(result).toEqual({
        email: mockData.email,
        name: mockUser.name,
        token: mockToken,
      });
    });

    it('should throw an error if the user does not exist', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.login(mockData)).rejects.toThrow(
        '401-Invalid Credentials'
      );
    });

    it('should throw an error if the password is incorrect', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        email: 'test@example.com',
        password: await bcrypt.hash('wrongpassword', 10),
      } as User;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(service.login(mockData)).rejects.toThrow(
        '401-Invalid Credentials'
      );
    });
  });
});
