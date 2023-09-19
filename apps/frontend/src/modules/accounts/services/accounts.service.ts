import { Injectable } from "@angular/core";
import { AccountsRepository } from "../repository/accounts.repository";

@Injectable({
    providedIn: "root"
})
export class AccountsService {
    constructor(
        private accountsRepository: AccountsRepository
    ) {}

    public fetchUserProfile() {
        return this.accountsRepository.fetchUserProfile();
    }

    public loginAccount(emailId: string, password: string) {
        return this.accountsRepository.login(emailId, password);
    }

    public logoutAccount() {
        return this.accountsRepository.logout();
    }
}