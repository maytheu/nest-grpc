/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const walletProtobufPackage = "wallet";

export interface CreditDTO {
  email: string;
  amount: number;
  status: boolean;
}

export interface DebitDTO {
  id: string;
  amount: number;
  bank: string;
  account: string;
}

export interface Wallet {
  balance: number;
}

export interface UserDTO {
  id: string;
}

export const WALLET_PACKAGE_NAME = "wallet";

export interface WalletServiceClient {
  credit(request: CreditDTO): Observable<Wallet>;

  debit(request: DebitDTO): Observable<Wallet>;

  balance(request: UserDTO): Observable<Wallet>;
}

export interface WalletServiceController {
  credit(request: CreditDTO): Promise<Wallet> | Observable<Wallet> | Wallet;

  debit(request: DebitDTO): Promise<Wallet> | Observable<Wallet> | Wallet;

  balance(request: UserDTO): Promise<Wallet> | Observable<Wallet> | Wallet;
}

export function WalletServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["credit", "debit", "balance"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WALLET_SERVICE_NAME = "WalletService";
