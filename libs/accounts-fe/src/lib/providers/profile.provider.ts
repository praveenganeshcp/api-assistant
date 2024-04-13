import { createContext } from "react";
import { SerializedUserProfile } from "../domain";

interface ProfileContextValue {
    isAuthenticated: boolean;
    data: null | SerializedUserProfile;
}

export const ProfileContext = createContext<ProfileContextValue>({ isAuthenticated: false, data: null });