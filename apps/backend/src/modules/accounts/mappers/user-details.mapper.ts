import { User, UserDetails } from "../entities/user.entity";
import { Mapper } from "@api-assistant/utils";

export class UserDetailsMapper implements Mapper<User, UserDetails> {
	from(user: User): UserDetails {
		return {
            emailId: user.emailId,
            username: user.username,
            lastLoggedInOn: user.lastLoggedInOn,
            isActive: user.isActive,
            isVerified: user.isVerified,
            createdOn: user.createdOn
		}
	}

	to(userDetails: UserDetails): User {
		throw new Error("method not implemented");
	}
}