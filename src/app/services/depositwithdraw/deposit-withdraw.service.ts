import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG_SERVICE } from '../../../app_config/AppConfig.service';
import { APP_CONFIGURATION } from '../../../app_config/appconfig.interface';

@Injectable({
  providedIn: 'root',
})
export class DepositWithdrawService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) private config: APP_CONFIGURATION
  ) {}

  depositMoney(name: string, amount: number) {
    return this.http.post(
      `${this.config.api}/bank/deposit?name=${name}`,
      amount,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }

  withdrawMoney(name: string, amount: number) {
    return this.http.post(
      `${this.config.api}/bank/withdraw?name=${name}`,
      amount,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }

  transferMoney(fromAccName: string, toAccName: string, money: number) {
    return this.http.post(
      `${this.config.api}/fromtoAcc`,
      {
        fromAccountName: fromAccName,
        toAccountName: toAccName,
        amount: money,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }

  public getTransactionHistory(name: string) {
    console.log(name);
    return this.http.get(
      `${this.config.api}/transfer/getAllTransactions?name=${name}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
}
