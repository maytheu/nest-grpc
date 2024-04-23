import { Test, TestingModule } from '@nestjs/testing';
import { TransactionApiService } from './transaction-api.service';

describe('TransactionApiService', () => {
  let service: TransactionApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionApiService],
    }).compile();

    service = module.get<TransactionApiService>(TransactionApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
