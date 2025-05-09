import { createAction, props } from '@ngrx/store';
import { UserStructure } from '../states/user.state';

export const addUser = createAction('addUser', (user: UserStructure) => ({
  user,
}));
export const removeUser = createAction('removeUser', (user: UserStructure) => ({
  user,
}));

export const loginUser = createAction('loginUser', props<{ data: object }>());
export const loginUserSuccess = createAction(
  'loginUserSuccess',
  props<{ user: UserStructure }>()
);
export const loginUserFailure = createAction(
  'loginUserFailure',
  props<{ error: any }>()
);

export const editUser = createAction(
  'editUser',
  props<{ name: string; data: { updatedName: string; age: number } }>()
);
export const editUserSuccess = createAction(
  'editUserSuccess',
  props<{ user: UserStructure }>()
);
export const editUserFailure = createAction(
  'editUserFailure',
  props<{ error: any }>()
);

export const createUser = createAction('createUser', props<{ data: Object }>());
export const createUserSuccess = createAction(
  'createUserSuccess',
  props<{ user: UserStructure }>()
);
export const createUserFailure = createAction(
  'createUserFailure',
  props<{ error: any }>()
);

export const logoutUser = createAction('logoutUser');
export const logoutUserSuccess = createAction('logoutUserSuccess', props<{user: UserStructure}>());
export const logoutUserFailure = createAction(
  'logoutUserFailure',
  props<{ error: any }>()
);
