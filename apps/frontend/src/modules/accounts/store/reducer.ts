import { createReducer, on } from '@ngrx/store';
import { AccountState } from './state';
import {
  loadProfile,
  profileLoaded,
  errorInLoadingProfile,
  createAccount,
  createAccountSuccess,
  createAccountError,
  loginAccount,
  loginSuccess,
  loginError,
  logoutAccount,
  logoutSuccess,
  logoutError,
  verifyAccount,
  verifyAccountSuccess,
  verifyAccountError,
  sendPasswordResetLink,
  sendPasswordResetLinkSuccess,
  sendPasswordResetLinkError,
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
    isSent: false,
    inProgress: false,
    error: '',
  },
};

export const accountsReducer = createReducer(
  defaultAccountState,
  on(loadProfile, (state) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: true,
    },
  })),
  on(profileLoaded, (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: false,
      data,
      error: '',
    },
  })),
  on(errorInLoadingProfile, (state, { error }) => ({
    ...state,
    profile: {
      ...state.profile,
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(createAccount, (state) => ({
    ...state,
    createAccount: {
      inProgress: true,
      error: '',
    },
  })),
  on(createAccountSuccess, (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      data,
    },
    createAccount: {
      inProgress: false,
      error: '',
    },
  })),
  on(createAccountError, (state, { error }) => ({
    ...state,
    createAccount: {
      inProgress: false,
      error,
    },
  })),
  on(loginAccount, (state) => ({
    ...state,
    login: {
      error: '',
      inProgress: true,
    },
  })),
  on(loginSuccess, (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      data,
    },
    login: {
      inProgress: false,
      error: '',
    },
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    login: {
      inProgress: false,
      error,
    },
  })),
  on(logoutAccount, (state) => ({
    ...state,
    logout: {
      inProgress: true,
    },
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    profile: {
      ...state.profile,
      data: null,
    },
    logout: {
      inProgress: false,
    },
  })),
  on(logoutError, (state) => ({
    ...state,
    logout: {
      inProgress: false,
    },
  })),
  on(verifyAccount, (state) => ({
    ...state,
    verifyAccount: {
      error: '',
      inProgress: true,
    },
  })),
  on(verifyAccountSuccess, (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      data,
    },
    verifyAccount: {
      error: '',
      inProgress: false,
    },
  })),
  on(verifyAccountError, (state, { error }) => ({
    ...state,
    verifyAccount: {
      inProgress: false,
      error,
    },
  })),

  on(sendPasswordResetLink, (state) => ({
    ...state,
    resetPasswordLink: {
      isSent: false,
      error: '',
      inProgress: true,
    },
  })),
  on(sendPasswordResetLinkSuccess, (state) => ({
    ...state,
    resetPasswordLink: {
      inProgress: false,
      isSent: true,
      error: '',
    },
  })),
  on(sendPasswordResetLinkError, (state, { error }) => ({
    ...state,
    resetPasswordLink: {
      isSent: false,
      inProgress: false,
      error,
    },
  }))
);
