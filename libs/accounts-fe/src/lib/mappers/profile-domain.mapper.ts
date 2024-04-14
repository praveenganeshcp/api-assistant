import { UserProfileBE } from "../be-types";
import { UserProfile } from "../domain";

export function profileDomainMapper(beProfile: UserProfileBE): UserProfile {
    const profile: UserProfile = {
        _id: beProfile._id,
        username: beProfile.username,
        emailId: beProfile.emailId,
        lastLoggedInOn: new Date(beProfile.lastLoggedInOn),
        createdOn: new Date(beProfile.createdOn),
        isActive: beProfile.isActive,
        isVerified: beProfile.isVerified
    }
    return profile;
}