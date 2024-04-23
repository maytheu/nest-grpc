import { Rate, RateDTO } from '@app/core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';

interface ExchangeRate {
  conversion_result: number;
}

@Injectable()
export class RateService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  async exchangeRate(rate: RateDTO): Promise<Rate> {
    try {
      const { amount, currencyFrom, currencyTo } = rate;
      const apiKey = this.configService.get<string>('EXCHANGE_KEY');
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currencyFrom}/${currencyTo}/${amount}`;
      const data = await firstValueFrom(
        this.httpService.get<ExchangeRate>(url).pipe(
          map(
            (res) => ({
              currencyFrom,
              currencyTo,
              result: res.data.conversion_result,
            })
            // catchError((err: AxiosError) => {
            //   console.log(err);
            // })
          )
        )
      );

      return data;
    } catch (error) {}
  }
}
