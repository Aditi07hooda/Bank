import { createReducer, on } from '@ngrx/store';
import { TransactionList } from '../states/transactionHistory.state';
import { getTransactionList, getTransactionListSuccess } from '../actions/transactionHistory.action';

export const reducer = createReducer(
  TransactionList,
  on(getTransactionList, (state, action) => {
    return state;
  }),
  on(getTransactionListSuccess, (state, action)=>{
    return action.transactionList;
  })
);
