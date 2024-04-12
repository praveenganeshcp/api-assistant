import { httpGet, httpPost } from "@api-assistant/utils-fe";
import { LoginBEPayload, UserProfileBE } from "./be-types";
import { UserProfile } from "./domain";
import { profileDomainMapper } from "./mappers/profile-domain.mapper";

export async function logout() {
    const response = await httpPost<void, void>("/accounts/logout", undefined);
    return response;
}

export async function login(emailId: string, password: string): Promise<UserProfile> {
    const response = await httpPost<LoginBEPayload, UserProfileBE>("/accounts/login", {emailId, password})
    return profileDomainMapper(response.body)
}

export async function fetchProfile(): Promise<UserProfile> {
    const response = await httpGet<UserProfileBE>("/accounts/profile");
    return profileDomainMapper(response.body);
}