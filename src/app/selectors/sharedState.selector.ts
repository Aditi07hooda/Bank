import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sharedInterface } from '../states/sharedState.state';

const selectSharedState = createFeatureSelector<sharedInterface>('shared');

export const selectError = (state: sharedInterface) => state.error;