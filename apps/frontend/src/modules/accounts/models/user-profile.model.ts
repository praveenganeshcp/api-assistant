export interface UserProfile {
    username: string;
    emailId: string;
    isVerified: boolean;
    isActive: boolean;
    lastLoggedInOn: Date;
    createdOn: Date
}