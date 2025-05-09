import { createAction, props } from "@ngrx/store";

export const depositMoney = createAction('depositMoney', props<{name: string, money: number}>());
export const depositMoneySuccess = createAction('depositMoneySuccess', props<{account: any}>());
export const depositMoneyFailure = createAction('depositMoneyFailure', props<{error: any}>());

export const withdrawMoney = createAction('withdrawMoney', props<{name: string, money: number}>());
export const withdrawMoneySuccess = createAction('withdrawMoneySuccess', props<{account: any}>());
export const withdrawMoneyFailure = createAction('withdrawMoneyFailure', props<{error: any}>());

export const transferMoney = createAction('transferMoney', props<{fromAcc: string, toAcc: string, money: number}>());
export const transferMoneySuccess = createAction('transferMoneySuccess');
export const transferMoneyFailure = createAction('transferMoneyFailure', props<{error: any}>());