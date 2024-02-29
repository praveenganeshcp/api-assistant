import { CanBeNull } from '@api-assistant/commons';
import { UserProfile } from '../models/accounts.types';

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
    inProgress: boolean;
    error: string;
    isSent: boolean;
  };
}
