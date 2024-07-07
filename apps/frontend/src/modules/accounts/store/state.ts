import { UserProfile } from '@api-assistant/auth-fe';
import { CanBeNull } from 'ngx-simple-widgets';

export interface ProfileState {
  data: CanBeNull<UserProfile>;
  isLoading: boolean;
  error: string;
}

export const PROFILE_STATE_SLICE_NAME = 'profile';
