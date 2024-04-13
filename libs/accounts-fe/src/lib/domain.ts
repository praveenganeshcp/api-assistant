export interface UserProfile {
    _id: string;
    username: string;
    emailId: string;
    isActive: boolean;
    isVerified: boolean;
    lastLoggedInOn: Date;
    createdOn: Date;   
}

export interface SerializedUserProfile extends Omit<UserProfile, "createdOn" | "lastLoggedInOn"> {
    lastLoggedInOn: string;
    createdOn: string;   
}