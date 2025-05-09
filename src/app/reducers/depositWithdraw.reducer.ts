import { createReducer, on } from '@ngrx/store';
import { user } from '../states/user.state';
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
} from '../actions/depositWithdraw.action';

export const reducer = createReducer(
  user,
  on(depositMoney, (state, action) => {
    return state;
  }),
  on(depositMoneySuccess, (state, action) => {
    console.log('depositMoneySuccess', action.account);
    return action.account;
  }),
  on(depositMoneyFailure, (state, action) => {
    return state;
  }),
  on(withdrawMoney, (state, action) => {
    return state;
  }),
  on(withdrawMoneySuccess, (state, action) => {
    console.log('withdrawMoneySuccess', action.account);
    return action.account;
  }),
  on(withdrawMoneyFailure, (state, action) => {
    return state;
  }),
  on(transferMoney, (state, action) => {
    return state;
  }),
  on(transferMoneySuccess, (state, action) => {
    return state;
  }),
  on(transferMoneyFailure, (state, action) => {
    return action.error;
  })
);
