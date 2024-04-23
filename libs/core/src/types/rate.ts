/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const rateProtobufPackage = "rate";

export interface RateDTO {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
}

export interface Rate {
  currencyFrom: string;
  currencyTo: string;
  result: number;
}

export const RATE_PACKAGE_NAME = "rate";

export interface RateServiceClient {
  exchangeRate(request: RateDTO): Observable<Rate>;
}

export interface RateServiceController {
  exchangeRate(request: RateDTO): Promise<Rate> | Observable<Rate> | Rate;
}

export function RateServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["exchangeRate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RateService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RateService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RATE_SERVICE_NAME = "RateService";
