import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

export const accountsSelector = (state: AppState) => state.accounts;

export const profileSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.profile
);

export const isProfileLoadingSelector = createSelector(
  profileSelector,
  (profileState) => profileState.isLoading
);

export const loggedInUserSelector = createSelector(
  profileSelector,
  (profileState) => profileState.data
);

export const isUserLoggingInSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.login.inProgress
);

export const isUserLoggingOutSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.logout.inProgress
);

export const isAccountBeingVerified = createSelector(
  accountsSelector,
  (accountsState) => accountsState.verifyAccount.inProgress
);

export const sendPasswordResetLinkInProgress = createSelector(
  accountsSelector,
  (accountsState) => accountsState.resetPasswordLink.inProgress
);

export const isSignupInProgress = createSelector(
  accountsSelector,
  (accountsState) => accountsState.createAccount.inProgress
);

export const isResetPasswordLinkSent = createSelector(
  accountsSelector,
  (accountsState) => accountsState.resetPasswordLink.isSent
);
