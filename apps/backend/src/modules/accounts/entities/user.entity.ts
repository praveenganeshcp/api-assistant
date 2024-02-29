import { CanBeNull } from '@api-assistant/commons';
import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  emailId: string;
  isActive: boolean;
  createdOn: Date;
  lastLoggedInOn: CanBeNull<Date>;
  isVerified: boolean;
  accountVerificationId: string;
  passwordResetKey: string;
}

export type UserDetails = Omit<
  User,
  'password' | 'accountVerificationId' | 'passwordResetKey'
>;
