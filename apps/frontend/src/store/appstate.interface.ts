import { AuthUserState } from "../modules/accounts/auth-user.slice";
import { UserProfile } from "../modules/accounts/models/user-profile.model";
import { EntityState } from "../modules/shared/models/entity-state.model";

export interface AppState {
    authUser: AuthUserState
}