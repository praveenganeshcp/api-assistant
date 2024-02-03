import { createReducer, on } from '@ngrx/store';
import { AccountState } from './state';
import {
  createAccountAction,
  createAccountErrorAction,
  createAccountSuccessAction,
  errorInLoadingProfileAction,
  loadProfileAction,
  loginAccountAction,
  loginErrorAction,
  loginSuccessAction,
  logoutAccountAction,
  logoutErrorAction,
  logoutSuccessAction,
  profileLoadedAction,
  sendPasswordResetLinkAction,
  sendPasswordResetLinkErrorAction,
  sendPasswordResetLinkSuccessAction,
  verifyAccountAction,
  verifyAccountErrorAction,
  verifyAccountSuccessAction,
} from './actions';

const defaultAccountState: AccountState = {
  profile: {
    isLoading: true,
    data: null,
    error: '',
  },
  createAccount: {
    inProgress: false,
    error: '',
  },
  login: {
    inProgress: false,
    error: '',
  },
  logout: {
    inProgress: false,
  },
  verifyAccount: {
    inProgress: false,
    error: '',
  },
  resetPasswordLink: {
    inProgress: false,
    error: '',
  },
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
  on(createAccountAction, (state) => ({
    ...state,
    createAccount: {
      inProgress: true,
      error: '',
    },
  })),
  on(createAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    },
    createAccount: {
      inProgress: false,
      error: '',
    },
  })),
  on(createAccountErrorAction, (state, { error }) => ({
    ...state,
    createAccount: {
      inProgress: false,
      error,
    },
  })),
  on(loginAccountAction, (state) => ({
    ...state,
    login: {
      error: '',
      inProgress: true,
    },
  })),
  on(loginSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    },
    login: {
      inProgress: false,
      error: '',
    },
  })),
  on(loginErrorAction, (state, { error }) => ({
    ...state,
    login: {
      inProgress: false,
      error,
    },
  })),
  on(logoutAccountAction, (state) => ({
    ...state,
    logout: {
      inProgress: true,
    },
  })),
  on(logoutSuccessAction, (state) => ({
    ...state,
    profile: {
      ...state.profile,
      data: null,
    },
    logout: {
      inProgress: false,
    },
  })),
  on(logoutErrorAction, (state) => ({
    ...state,
    logout: {
      inProgress: false,
    },
  })),
  on(verifyAccountAction, (state) => ({
    ...state,
    verifyAccount: {
      error: '',
      inProgress: true,
    },
  })),
  on(verifyAccountSuccessAction, (state, { userProfile }) => ({
    ...state,
    profile: {
      ...state.profile,
      data: userProfile,
    },
    verifyAccount: {
      error: '',
      inProgress: false,
    },
  })),
  on(verifyAccountErrorAction, (state, { error }) => ({
    ...state,
    verifyAccount: {
      inProgress: false,
      error,
    },
  })),

  on(sendPasswordResetLinkAction, (state) => ({
    ...state,
    resetPasswordLink: {
      error: '',
      inProgress: true,
    },
  })),
  on(sendPasswordResetLinkSuccessAction, (state) => ({
    ...state,
    resetPasswordLink: {
      inProgress: false,
      error: '',
    },
  })),
  on(sendPasswordResetLinkErrorAction, (state, { error }) => ({
    ...state,
    resetPasswordLink: {
      inProgress: false,
      error,
    },
  }))
);
