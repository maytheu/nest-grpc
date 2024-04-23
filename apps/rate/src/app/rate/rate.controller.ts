import {
  Rate,
  RateDTO,
  RateServiceController,
  RateServiceControllerMethods,
} from '@app/core';
import { Controller } from '@nestjs/common';
import { RateService } from './rate.service';
import { Observable } from 'rxjs';

@Controller()
@RateServiceControllerMethods()
export class RateController implements RateServiceController {
  constructor(private rateService: RateService) {}

  async exchangeRate(request: RateDTO): Promise<Rate> {
    return await this.rateService.exchangeRate(request);
  }
}
