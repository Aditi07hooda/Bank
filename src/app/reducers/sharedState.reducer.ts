import { createReducer, on } from "@ngrx/store";
import { sharedState } from "../states/sharedState.state";
import { errorMessage } from "../actions/sharedState.action";

export const reducer = createReducer(
  sharedState,
  on(errorMessage, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
)
