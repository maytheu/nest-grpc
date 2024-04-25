/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const transactionProtobufPackage = "transaction";

export interface Transaction {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  type: string;
}

export interface Transactions {
  Transactions: Transaction[];
}

 interface UserDTO {
  id: string;
}

export interface TransactionDTO {
  id: string;
  currency: string;
  amount: number;
  url: string;
}

export const TRANSACTION_PACKAGE_NAME = "transaction";

export interface TransacttionServiceClient {
  buyCurrency(request: TransactionDTO): Observable<Transaction>;

  sellCurrency(request: TransactionDTO): Observable<Transaction>;

  allTransactions(request: UserDTO): Observable<Transactions>;
}

export interface TransacttionServiceController {
  buyCurrency(request: TransactionDTO): Promise<Transaction> | Observable<Transaction> | Transaction;

  sellCurrency(request: TransactionDTO): Promise<Transaction> | Observable<Transaction> | Transaction;

  allTransactions(request: UserDTO): Promise<Transactions> | Observable<Transactions> | Transactions;
}

export function TransacttionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["buyCurrency", "sellCurrency", "allTransactions"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TransacttionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TransacttionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TRANSACTTION_SERVICE_NAME = "TransacttionService";
