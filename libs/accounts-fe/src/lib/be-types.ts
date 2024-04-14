export interface UserProfileBE {
	_id: string;
	emailId: string;
	username: string;
	lastLoggedInOn: string;
	isActive: boolean;
	isVerified: boolean;
	createdOn: string;
}

export interface LoginBEPayload {
    emailId: string;
    password: string;
}