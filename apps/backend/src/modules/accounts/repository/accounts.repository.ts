import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "@api-assistant/repository";

@Injectable()
export class AccountsRepository extends Repository<User> {
    constructor() {
        super("users")
    }
}