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
    error: string;
  };
  login: {
    inProgress: boolean;
    error: string;
  };
  logout: {
    inProgress: boolean;
  };
  verifyAccount: {
    inProgress: boolean;
    error: string;
  };
  resetPasswordLink: {
    isSent: boolean;
    inProgress: boolean;
    error: string;
  };
}
