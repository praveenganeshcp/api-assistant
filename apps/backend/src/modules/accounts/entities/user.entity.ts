import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    username: string;
    password: string;
    emailId: string;
    isActive: boolean;
    createdOn: Date;
    lastLoggedInOn: Date;
    isVerified: boolean;
}

export type UserDetails = Omit<User, "password" | "_id">;