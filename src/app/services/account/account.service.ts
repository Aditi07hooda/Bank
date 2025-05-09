import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APP_CONFIG_SERVICE } from '../../../app_config/AppConfig.service';
import { APP_CONFIGURATION } from '../../../app_config/appconfig.interface';
import { Observable } from 'rxjs';
import { UserStructure } from '../../states/user.state';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) private config: APP_CONFIGURATION
  ) {
    console.log(this.config.api);
  }
  getAccount(data: object): Observable<UserStructure> {
    return this.http.post<UserStructure>(
      `${environment.api}/bank/getAcc`,
      data
    );
  }

  createAccount(data: object): Observable<UserStructure> {
    return this.http.post<UserStructure>(
      `${environment.api}/bank/createAcc`,
      data
    );
  }

  editAccount(name: string, data: object): Observable<UserStructure> {
    return this.http.put<UserStructure>(
      `${environment.api}/bank/editprofile?name=${name}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
}
