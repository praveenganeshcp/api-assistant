import { CanBeNull } from "@api-assistant/utils";
import { ObjectId } from "mongodb";

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

export type UserDetails = Omit<User, "password" | "_id" | "accountVerificationId" | "passwordResetKey">;