import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';

/**
 * Validates if email in form control is already registered in the system
 */
@Injectable({
  providedIn: 'root',
})
export class DuplicateEmailIdValidatorService {
  constructor(private accountsService: AccountsService) {}

  public validate(formControl: AbstractControl) {
    const emailId: string = formControl.value;
    return this.accountsService.checkIfEmailIDRegistered(emailId).pipe(
      map((isEmailIdRegistered) => {
        return isEmailIdRegistered ? { duplicateEmailId: true } : null;
      })
    );
  }
}
