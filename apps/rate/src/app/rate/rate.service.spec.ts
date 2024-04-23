import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from './rate.service';

describe('RateService', () => {
  let service: RateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateService],
    }).compile();

    service = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
