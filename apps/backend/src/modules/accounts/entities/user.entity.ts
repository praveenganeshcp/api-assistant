import { CanBeNull } from "apps/backend/src/utils/types";
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
}

export type UserDetails = Omit<User, "password" | "_id">;