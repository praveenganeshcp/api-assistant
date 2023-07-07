import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { valueIsDefined } from "apps/backend/src/utils/types";

@Injectable()
export class AccountsService {

    constructor(
        private readonly accountsRepository: AccountsRepository
    ) {}

    public async isEmailIdUnique(emailId: string): Promise<boolean> {
        const existingUserAccount = await this.accountsRepository.findOne({emailId});
        return !valueIsDefined(existingUserAccount);
    }
}