import { CanBeNull } from '@api-assistant/utils';
import { UserProfile } from '../accounts.types';

export interface AccountState {
  profile: {
    data: CanBeNull<UserProfile>;
    isLoading: boolean;
    error: string;
  };
  createAccount: {
    inProgress: boolean;
  };
  login: {
    inProgress: boolean;
  };
  logout: {
    inProgress: boolean;
  };
  verifyAccount: {
    inProgress: boolean;
  };
  resetPasswordLink: {
    isSent: boolean;
    inProgress: boolean;
  };
}
