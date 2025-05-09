import { inject, Injectable } from '@angular/core';
import { DepositWithdrawService } from '../depositwithdraw/deposit-withdraw.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getTransactionList,
  getTransactionListFailure,
  getTransactionListSuccess,
} from '../../actions/transactionHistory.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import {
  depositMoney,
  depositMoneyFailure,
  depositMoneySuccess,
  transferMoney,
  transferMoneyFailure,
  transferMoneySuccess,
  withdrawMoney,
  withdrawMoneyFailure,
  withdrawMoneySuccess,
} from '../../actions/depositWithdraw.action';
import { loginUser } from '../../actions/user.actions';
import { errorMessage } from '../../actions/sharedState.action';

@Injectable()
export class TransactionEffect {
  private actions$ = inject(Actions);
  private transactionService = inject(DepositWithdrawService);

  getTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransactionList),
      exhaustMap((action: any) =>
        this.transactionService.getTransactionHistory(action.name).pipe(
          map((data) => getTransactionListSuccess({ transactionList: data })),
          catchError((error) => {
            return of(getTransactionListFailure({ error }));
          })
        )
      )
    )
  );

  deposit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(depositMoney),
      mergeMap((action: any) =>
        this.transactionService.depositMoney(action.name, action.money).pipe(
          mergeMap((data) => [depositMoneySuccess({ account: data })]),
          catchError((error) => of(depositMoneyFailure({ error })))
        )
      )
    )
  );

  withdraw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(withdrawMoney),
      mergeMap((action: any) =>
        this.transactionService.withdrawMoney(action.name, action.money).pipe(
          mergeMap((data) => [withdrawMoneySuccess({ account: data })]),
          catchError((error) => of(withdrawMoneyFailure({ error })))
        )
      )
    )
  );

  transfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferMoney),
      mergeMap((action: any) =>
        this.transactionService
          .transferMoney(action.fromAcc, action.toAcc, action.money)
          .pipe(
            mergeMap((data) => [transferMoneySuccess()]),
            catchError((error) => of(transferMoneyFailure({ error })))
          )
      )
    )
  );
}
