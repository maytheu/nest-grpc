import { Test, TestingModule } from '@nestjs/testing';
import { WalletApiController } from './wallet-api.controller';

describe('WalletApiController', () => {
  let controller: WalletApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletApiController],
    }).compile();

    controller = module.get<WalletApiController>(WalletApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
