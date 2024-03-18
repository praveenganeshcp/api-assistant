import { CanBeNull } from 'ngx-simple-widgets';
import { UserProfile } from '../models/accounts.types';

export interface ProfileState {
  data: CanBeNull<UserProfile>;
  isLoading: boolean;
  error: string;
}

export const PROFILE_STATE_SLICE_NAME = 'profile';

export type GlobalState = { [PROFILE_STATE_SLICE_NAME]: ProfileState };
