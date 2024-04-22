import { Test, TestingModule } from '@nestjs/testing';
import { WalletApiService } from './wallet-api.service';

describe('WalletApiService', () => {
  let service: WalletApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletApiService],
    }).compile();

    service = module.get<WalletApiService>(WalletApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
