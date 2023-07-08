import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { CanBeNull, valueIsDefined } from "apps/backend/src/utils/types";
import { User } from "../entities/user.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class AccountsService {

    constructor(
        private readonly accountsRepository: AccountsRepository
    ) {}

    public async findUserById(id: string): Promise<CanBeNull<User>> {
        return this.accountsRepository.findOne({_id: new ObjectId(id)});
    }

    public async findUserByEmailID(emailId: string): Promise<CanBeNull<User>> {
        return this.accountsRepository.findOne({emailId});
    }

    public async isEmailIdUnique(emailId: string): Promise<boolean> {
        const existingUserAccount = await this.accountsRepository.findOne({emailId});
        return !valueIsDefined(existingUserAccount);
    }
}