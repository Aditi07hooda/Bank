import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIGURATION } from '../../../app_config/appconfig.interface';
import {
  APP_CONFIG,
  APP_CONFIG_SERVICE,
} from '../../../app_config/AppConfig.service';
import { ILoanHistory, ILoanHistoryResponse } from '../../states/loan.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) private config: APP_CONFIGURATION
  ) {}

  requestHomeLoan(data: FormData) {
    return this.http.post(`${this.config.api}/loan/homeloan`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  }
  requestEducationLoan(data: FormData) {
    return this.http.post(`${this.config.api}/loan/educationloan`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  }
  requestPersonalLoan(data: FormData) {
    return this.http.post(`${this.config.api}/loan/personalloan`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  }

  getLoanHistory(userName: string | null): Observable<ILoanHistory> {
    return this.http.get<ILoanHistory>(
      `${this.config.api}/loan/history?userName=${userName}`
    );
  }

  getLoanPayHistory(
    loanId: number,
    username: string
  ): Observable<ILoanHistoryResponse> {
    return this.http.get<ILoanHistoryResponse>(
      `${this.config.api}/loan/payment-history?username=${username}&loanId=${loanId}`
    );
  }

  makeLoanPayment(loanId: number, amount: number) {
    return this.http.post(
      `${this.config.api}/loan/payment?loanId=${loanId}`,
      amount
    );
  }
}
