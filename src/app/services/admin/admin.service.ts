import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG_SERVICE } from '../../../app_config/AppConfig.service';
import { APP_CONFIGURATION } from '../../../app_config/appconfig.interface';
import { Observable } from 'rxjs';
import {
  GetAllNumbersResponse,
  ILoanRequest,
  LoanRequestResponse,
} from '../../states/loan.state';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) private config: APP_CONFIGURATION
  ) {}

  getAllUserAccount() {
    return this.http.get(`${this.config.api}/bank/allAcc`);
  }

  deleteAccount(userID : number) {
    return this.http.delete(`${this.config.api}/bank/delete?userID=${userID}`);
  }

  getAllLoanRequests(): Observable<LoanRequestResponse> {
    return this.http.get<LoanRequestResponse>(
      `${this.config.api}/loan/getAllRequests`
    );
  }

  approveLoanRequest(id: number): Observable<ILoanRequest> {
    return this.http.post<ILoanRequest>(`${this.config.api}/loan/approve`, id);
  }

  rejectLoanRequest(id: number): Observable<ILoanRequest> {
    return this.http.post<ILoanRequest>(`${this.config.api}/loan/reject`, id);
  }

  getAllNumbers(): Observable<GetAllNumbersResponse> {
    return this.http.get<GetAllNumbersResponse>(
      `${this.config.api}/loan/getNumbers`
    );
  }
}
