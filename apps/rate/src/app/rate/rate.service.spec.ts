import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from './rate.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

describe('RateService', () => {
  let service: RateService;
  let configService: ConfigService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RateService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<RateService>(RateService);
    configService = module.get(ConfigService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('exchangeRate', () => {
    it('should return exchange rate data', async () => {
      const rateDTO = {
        amount: 100,
        currencyFrom: 'USD',
        currencyTo: 'EUR',
      };
      const apiKey = 'fakeApiKey';
      const responseData: any = {
        data: {
          conversion_result: 90,
        },
      };

      jest.spyOn(configService, 'get').mockReturnValueOnce(apiKey);
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(responseData));

      const result = await service.exchangeRate(rateDTO);

      expect(result).toEqual({
        currencyFrom: rateDTO.currencyFrom,
        currencyTo: rateDTO.currencyTo,
        result: responseData.data.conversion_result,
      });
    });
  });

  it('should throw RpcException if API call fails', async () => {
    const rateDTO = {
      amount: 100,
      currencyFrom: 'USD',
      currencyTo: 'EUR',
    };

    const errorMessage = 'Mocked API error';

    jest.spyOn(configService, 'get').mockReturnValueOnce('fakeApiKey');
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new AxiosError(errorMessage)));

    await expect(service.exchangeRate(rateDTO)).rejects.toThrow(
      `500-${errorMessage}`
    );
  });
});
