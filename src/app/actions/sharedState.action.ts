import { createAction, props } from "@ngrx/store";

export const errorMessage = createAction('errorMessage', props<{error: any}>());
