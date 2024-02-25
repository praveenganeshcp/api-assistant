import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction,
  props,
} from '@ngrx/store';
import { UserProfile } from '../accounts.types';
import { CanBeNull } from '@api-assistant/utils';

/**
 * Prefix to be included in user account action names
 */
const USER_ACCOUNT_ACTIONS_PREFIX = '[Accounts]';

/**
 * Create user account related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createUserAccountActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return createAction(`${USER_ACCOUNT_ACTIONS_PREFIX} ${type}`, config);
}

/**
 * Create user account related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createUserAccountAction<T extends string>(type: T) {
  return createAction(`${USER_ACCOUNT_ACTIONS_PREFIX} ${type}`);
}

// ############ Start User profile actions ############### //

export const loadProfileAction = createUserAccountAction('Load Profile');

export const profileLoadedAction = createUserAccountActionWithProps(
  'Profile loaded',
  props<{ userProfile: CanBeNull<UserProfile> }>()
);

export const errorInLoadingProfileAction = createUserAccountActionWithProps(
  'Error in loading profile',
  props<{ error: string }>()
);

// ############ End User profile actions ############### //

// ############ Start create account actions ############### //
export const createAccountAction = createUserAccountActionWithProps(
  'Create Account',
  props<{ emailId: string; password: string; username: string }>()
);

export const createAccountSuccessAction = createUserAccountActionWithProps(
  'Create Account success',
  props<{ userProfile: UserProfile }>()
);

export const createAccountErrorAction = createUserAccountActionWithProps(
  'Create Account error',
  props<{ error: string }>()
);
// ############ End create account actions ############### //

// ############ Start login account actions ############### //

export const loginAccountAction = createUserAccountActionWithProps(
  'Login Account',
  props<{ emailId: string; password: string, callbackUrl: string }>()
);

export const loginSuccessAction = createUserAccountActionWithProps(
  'Login Success',
  props<{ userProfile: UserProfile }>()
);

export const loginErrorAction = createUserAccountActionWithProps(
  'Login Error',
  props<{ error: string }>()
);

// ############ End login account actions ############### //

// ############ Start logout account actions ############### //

export const logoutAccountAction = createUserAccountAction('Logout Account');

export const logoutSuccessAction = createUserAccountAction('Logout success');

export const logoutErrorAction = createUserAccountAction('Logout error');

// ############ End logout account actions ############### //

// ############ Start verify account actions ############### //

export const verifyAccountAction = createUserAccountActionWithProps(
  'Verify Account',
  props<{ key: string }>()
);

export const verifyAccountSuccessAction = createUserAccountActionWithProps(
  'Verify account success',
  props<{ userProfile: UserProfile }>()
);

export const verifyAccountErrorAction = createUserAccountActionWithProps(
  'Verify account error',
  props<{ error: string }>()
);

// ############ End verify account actions ############### //

// ############ Start password reset actions ############### //

export const sendPasswordResetLinkAction = createUserAccountActionWithProps(
  'Send Password reset link',
  props<{ emailId: string }>()
);

export const sendPasswordResetLinkSuccessAction = createUserAccountAction(
  'Send Password reset link success'
);

export const sendPasswordResetLinkErrorAction =
  createUserAccountActionWithProps(
    'Send Password reset error',
    props<{ error: string }>()
  );

// ############ End password reset actions ############### //
