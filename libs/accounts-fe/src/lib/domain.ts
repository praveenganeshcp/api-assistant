export interface UserProfile {
    _id: string;
    username: string;
    emailId: string;
    isActive: boolean;
    isVerified: boolean;
    lastLoggedInOn: Date;
    createdOn: Date;   
}