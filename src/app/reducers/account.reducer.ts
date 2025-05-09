import { createReducer, on } from '@ngrx/store';
import { user } from '../states/user.state';
import {
  addUser,
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
  removeUser,
} from '../actions/user.actions';

export const reducer = createReducer(
  user,
  on(addUser, (state, action) => ({
    ...state,
    id: action.user.account.id,
    name: action.user.account.name,
    age: action.user.account.age,
  })),
  on(removeUser, (state) => ({
    ...state,
    id: 0,
    name: '',
    age: 0,
  })),

  on(loginUser, (state, action) => {
    return state;
  }),
  on(loginUserSuccess, (state, action) => ({
    ...action.user,
  })),
  on(loginUserFailure, (state, action) => {
    return state;
  }),

  on(editUser, (state, action) => {
    return state;
  }),
  on(editUserSuccess, (state, action) => ({
    ...state,
    name: action.user.account.name,
    age: action.user.account.age,
    balance: action.user.account.balance,
  })),
  on(editUserFailure, (state, action) => {
    return state;
  }),

  on(createUser, (state, action) => {
    return state;
  }),
  on(createUserSuccess, (state, action) => ({
    ...state,
    id: action.user.account.id,
    name: action.user.account.name,
    age: action.user.account.age,
    balance: action.user.account.balance,
  })),
  on(createUserFailure, (state, action) => ({
    ...state,
  })),

  on(logoutUser, (state) => {
    return state;
  }),
  on(logoutUserSuccess, (state) => ({
    ...state,
    id: 0,
    name: '',
    age: 0,
    balance: 0,
  })),
  on(logoutUserFailure, (state, action) => ({
    ...state,
  }))
);
