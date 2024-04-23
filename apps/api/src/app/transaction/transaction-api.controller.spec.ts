import { Test, TestingModule } from '@nestjs/testing';
import { TransactionApiController } from './transaction-api.controller';

describe('TransactionApiController', () => {
  let controller: TransactionApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionApiController],
    }).compile();

    controller = module.get<TransactionApiController>(TransactionApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
