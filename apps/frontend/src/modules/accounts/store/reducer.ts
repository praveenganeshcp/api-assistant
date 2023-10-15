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
  },
  login: {
    inProgress: false,
  },
  logout: {
    inProgress: false,
  },
  verifyAccount: {
    inProgress: false,
  },
  resetPasswordLink: {
    isSent: false,
    inProgress: false,
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
    },
  })),
  on(createAccountError, (state) => ({
    ...state,
    createAccount: {
      inProgress: false,
    },
  })),
  on(loginAccount, (state) => ({
    ...state,
    login: {
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
    },
  })),
  on(loginError, (state) => ({
    ...state,
    login: {
      inProgress: false,
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
      inProgress: false,
    },
  })),
  on(verifyAccountError, (state) => ({
    ...state,
    verifyAccount: {
      inProgress: false,
    },
  })),

  on(sendPasswordResetLink, (state) => ({
    ...state,
    resetPasswordLink: {
      ...state.resetPasswordLink,
      inProgress: true,
    },
  })),
  on(sendPasswordResetLinkSuccess, (state) => ({
    ...state,
    resetPasswordLink: {
      inProgress: false,
      isSent: true,
    },
  })),
  on(sendPasswordResetLinkError, (state) => ({
    ...state,
    resetPasswordLink: {
      ...state.resetPasswordLink,
      inProgress: false,
    },
  }))
);
