import { createAction, props } from '@ngrx/store';
import { Transaction } from '../states/transactionHistory.state';

export const getTransactionList = createAction(
  'getTransactionHistory',
  props<{ name: string }>()
);

export const getTransactionListSuccess = createAction(
  'getTransactionHistorySuccess',
  props<{ transactionList: any }>()
);

export const getTransactionListFailure = createAction(
  'getTransactionHistoryFailure',
  props<{ error: any }>()
);
