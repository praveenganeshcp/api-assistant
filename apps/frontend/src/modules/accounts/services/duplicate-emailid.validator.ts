import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
import { map } from 'rxjs';
import { AbstractControl } from '@angular/forms';

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
