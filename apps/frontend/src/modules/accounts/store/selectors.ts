import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

export const accountsSelector = (state: AppState) => state.accounts;

// ############ Start User profile selectors ############### //

export const profileStateSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.profile
);

export const isProfileLoadingSelector = createSelector(
  profileStateSelector,
  (profileState) => profileState.isLoading
);

export const userProfileSelector = createSelector(
  profileStateSelector,
  (profileState) => profileState.data
);

export const isUserProfileVerifiedSelector = createSelector(
  userProfileSelector,
  (userProfile) => userProfile?.isVerified
);

export const isUserLoggedInSelector = createSelector(
  profileStateSelector,
  (profileState) => !profileState.isLoading && profileState.data !== null
);

// ############ End of user profile selectors ############### //

// ############ Start of login slice selectors ############### //

const loginStateSelector = createSelector(
  accountsSelector,
  (accountsSelector) => accountsSelector.login
);

export const isUserSigninInProgressSelector = createSelector(
  loginStateSelector,
  (loginState) => loginState.inProgress
);

export const loginErrorMessageSelector = createSelector(
  loginStateSelector,
  (loginState) => loginState.error
);

// ############ End of login slice selectors ############### //

// ############ Start of create account slice selectors ############### //

const createAccountStateSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.createAccount
);

export const createAccountErrorMessageSelector = createSelector(
  createAccountStateSelector,
  (createAccountState) => createAccountState.error
);

export const isSignupInProgressSelector = createSelector(
  createAccountStateSelector,
  (createAccountState) => createAccountState.inProgress
);

// ############ End of create account slice selectors ############### //

// ############ Start of password reset slice selectors ############### //

const passwordResetStateSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.resetPasswordLink
);

export const sendResetPasswordLinkErrorMessageSelector = createSelector(
  passwordResetStateSelector,
  (passwordResetState) => passwordResetState.error
);

export const sendPasswordResetLinkInProgressSelector = createSelector(
  passwordResetStateSelector,
  (passwordResetState) => passwordResetState.inProgress
);

// ############ End of password reset slice selectors ############### //

// ############ Start of verify account selectors ############### //

const accountVerificationStateSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.verifyAccount
);

export const verifyAccountErrorMessageSelector = createSelector(
  accountVerificationStateSelector,
  (accountVerificationState) => accountVerificationState.error
);

export const isAccountBeingVerifiedSelector = createSelector(
  accountVerificationStateSelector,
  (accountVerificationState) => accountVerificationState.inProgress
);

// ############ End of verify account selectors ############### //

// ############ Start of logout account selectors ############### //

export const isUserLoggingOutSelector = createSelector(
  accountsSelector,
  (accountsState) => accountsState.logout.inProgress
);

// ############ End of logout account selectors ############### //
