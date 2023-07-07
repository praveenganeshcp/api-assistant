import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../repository/abstract-repository";
import { DB_COLLECTIONS } from "../../repository/db-collections";
import { User } from "../entities/user.entity";

@Injectable()
export class AccountsRepository extends AbstractRepository<User> {
    constructor() {
        super(DB_COLLECTIONS.USERS)
    }
}