import { CanBeNull } from '@api-assistant/commons';
import { UserProfile } from '../models/accounts.types';

export interface AccountState {
  profile: {
    data: CanBeNull<UserProfile>;
    isLoading: boolean;
    error: string;
  }
}

export const ACCOUNTS_STATE_SLICE_NAME = "accounts";

export type GlobalState = {[ACCOUNTS_STATE_SLICE_NAME]: AccountState}
