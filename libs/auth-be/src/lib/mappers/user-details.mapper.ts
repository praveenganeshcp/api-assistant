import { User, UserDetails } from '../entities/user.entity';
import { Mapper } from '@api-assistant/commons-be';

export class UserDetailsMapper implements Mapper<User, UserDetails> {
  from(user: User): UserDetails {
    return {
      _id: user._id,
      emailId: user.emailId,
      username: user.username,
      lastLoggedInOn: user.lastLoggedInOn,
      isActive: user.isActive,
      isVerified: user.isVerified,
      createdOn: user.createdOn,
    };
  }

  to(): User {
    throw new Error('method not implemented');
  }
}
