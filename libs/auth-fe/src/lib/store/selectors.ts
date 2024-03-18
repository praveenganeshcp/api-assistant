import { createSelector } from '@ngrx/store';
import { GlobalState } from './state';

export const profileStateSelector = (state: GlobalState) => state.profile;

// ############ Start User profile selectors ############### //

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
