import { SerializedUserProfile } from "@api-assistant/accounts-fe";

export interface ProfileState {
    loading: boolean;
    data: null | SerializedUserProfile,
    error: string
}