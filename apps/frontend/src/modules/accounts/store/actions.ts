import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../accounts.types';
import { CanBeNull } from '@api-assistant/utils';

export const loadProfile = createAction('[Account] Load Profile');

export const profileLoaded = createAction(
  '[Account] Profile loaded',
  props<{ data: CanBeNull<UserProfile> }>()
);

export const errorInLoadingProfile = createAction(
  '[Account] Error in loading profile',
  props<{ error: string }>()
);

export const createAccount = createAction(
  '[Account] Create Account',
  props<{ payload: { emailId: string; password: string; username: string } }>()
);

export const createAccountSuccess = createAction(
  '[Account] Create Account success',
  props<{ data: UserProfile }>()
);

export const createAccountError = createAction(
  '[Account] Create Account error'
);

export const loginAccount = createAction(
  '[Account] Login Account',
  props<{ payload: { emailId: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Account] Login Success',
  props<{ data: UserProfile }>()
);

export const loginError = createAction('[Account] Login Error');

export const logoutAccount = createAction('[Account] Logout Account');

export const logoutSuccess = createAction('[Account] Logout success');

export const logoutError = createAction('[Account] Logout error');

export const verifyAccount = createAction(
  '[Account] Verify Account',
  props<{ key: string }>()
);

export const verifyAccountSuccess = createAction(
  '[Account] Verify account success',
  props<{ data: UserProfile }>()
);

export const verifyAccountError = createAction(
  '[Account] Verify account error'
);

export const sendPasswordResetLink = createAction(
  '[Account] Send Password reset link',
  props<{ emailId: string }>()
);

export const sendPasswordResetLinkSuccess = createAction(
  '[Account] Send Password reset link success'
);

export const sendPasswordResetLinkError = createAction(
  '[Account] Send Password reset error'
);
