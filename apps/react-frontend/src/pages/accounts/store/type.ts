import { UserProfile } from "@api-assistant/accounts-fe";

export interface ProfileState {
    loading: boolean;
    data: null | UserProfile,
    error: string
}