import { Injectable } from '@angular/core';
import { AccountsRepository } from '../repository/accounts.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private accountsRepository: AccountsRepository) {}

  public fetchUserProfile() {
    return this.accountsRepository.fetchUserProfile();
  }

  public loginAccount(emailId: string, password: string) {
    return this.accountsRepository.login(emailId, password);
  }

  public createAccount(emailId: string, password: string, username: string) {
    return this.accountsRepository.signup(emailId, password, username);
  }

  public logoutAccount() {
    return this.accountsRepository.logout();
  }

  public checkIfEmailIDRegistered(emailId: string): Observable<boolean> {
    return this.accountsRepository.checkIfEmailIdRegistered(emailId);
  }

  public verifyAccount(verificationKey: string) {
    return this.accountsRepository.verifyAccount(verificationKey);
  }

  public sendPasswordResetLink(emailId: string) {
    return this.accountsRepository.sendPasswordResetLink(emailId);
  }
}
