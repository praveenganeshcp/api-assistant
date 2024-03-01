import { createReducer, on } from '@ngrx/store';
import { AccountState } from './state';
import {
  createAccountSuccessAction,
  errorInLoadingProfileAction,
  loadProfileAction,
  loginSuccessAction,
  profileLoadedAction,
  verifyAccountSuccessAction,
} from './actions';

const defaultAccountState: AccountState = {
  profile: {
    isLoading: true,
    data: null,
    error: '',
  }
};

export const accountsReducer = createReducer(
  defaultAccountState,
  on(loadProfileAction, (state) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: true,
    },
  })),
  on(profileLoadedAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: false,
      data: userProfile,
      error: '',
    },
  })),
  on(errorInLoadingProfileAction, (state, { error }) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(createAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    }
  })),
  on(loginSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    }
  })),
  on(verifyAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    }
  })),
);
