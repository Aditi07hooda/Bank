import { inject } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  editUser,
  editUserFailure,
  editUserSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  logoutUserFailure,
  logoutUserSuccess,
} from '../../actions/user.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export class AccountEffect {
  private action$ = inject(Actions);
  private accService = inject(AccountService);

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginUser),
      exhaustMap((action: any) => {
        return this.accService.getAccount(action.data).pipe(
          map((data) => {
            localStorage.setItem('token', data.token || '');
            console.log(data.token);
            return loginUserSuccess({
              user: {
                account: {
                  id: data.account.id,
                  name: data.account.name,
                  balance: data.account.balance,
                  age: data.account.age,
                },
              },
            });
          }),
          catchError((error: any) => {
            return of(loginUserFailure({ error }));
          })
        );
      })
    );
  });

  edit$ = createEffect(() => {
    return this.action$.pipe(
      ofType(editUser),
      exhaustMap((action: any) => {
        console.log('the action data is' + action.name, action.data);
        return this.accService.editAccount(action.name, action.data).pipe(
          map((data) => {
            localStorage.setItem('Name', data.account.name);
            return editUserSuccess({ user: data });
          }),
          catchError((error: any) => {
            return of(editUserFailure({ error }));
          })
        );
      })
    );
  });

  create$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createUser),
      exhaustMap((action: any) => {
        return this.accService.createAccount(action.data).pipe(
          map((data) => {
            localStorage.setItem('Name', data.account.name);
            localStorage.setItem('token', data.token || '');
            return createUserSuccess({ user: data });
          }),
          catchError((error: any) => {
            return of(createUserFailure({ error }));
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(logoutUser),
      map(() => {
        localStorage.removeItem('Name');
        localStorage.removeItem('token');
        return logoutUserSuccess({
          user: {
            account: {
              id: 0,
              name: '',
              balance: 0,
              age: 0,
            },
          },
        });
      }),
      catchError((error: any) => {
        return of(logoutUserFailure({ error }));
      })
    );
  });
}
