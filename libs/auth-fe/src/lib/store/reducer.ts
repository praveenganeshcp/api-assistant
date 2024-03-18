import { createReducer, on } from '@ngrx/store';
import {
  createAccountSuccessAction,
  errorInLoadingProfileAction,
  loadProfileAction,
  loginSuccessAction,
  logoutSuccessAction,
  profileLoadedAction,
  verifyAccountSuccessAction,
} from './actions';
import { ProfileState } from './state';

const defaultProfileState: ProfileState = {
  isLoading: true,
  data: null,
  error: '',
};

export const accountsReducer = createReducer(
  defaultProfileState,
  on(loadProfileAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(profileLoadedAction, (state, { userProfile }) => ({
    isLoading: false,
    data: userProfile,
    error: '',
  })),
  on(errorInLoadingProfileAction, (state, { error }) => ({
    isLoading: false,
    data: null,
    error,
  })),
  on(createAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    data: userProfile,
  })),
  on(loginSuccessAction, (state, { userProfile }) => ({
    ...state,
    data: userProfile,
  })),
  on(verifyAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    data: userProfile,
  })),
  on(logoutSuccessAction, (state) => ({
    ...state,
    data: null,
  }))
);
