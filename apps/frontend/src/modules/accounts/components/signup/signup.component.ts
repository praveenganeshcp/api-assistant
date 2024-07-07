import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuplicateEmailIdValidatorService, SignupFormComponent, SignupFormData, UniqueEmailIdValidator } from '@api-assistant/auth-fe';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  createAccountAction,
  createAccountErrorAction,
  createAccountSuccessAction,
} from '../../store/actions';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SwToastService } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-signup',
  standalone: true,
  imports: [CommonModule, SignupFormComponent],
  templateUrl: './signup.component.html',
  providers: [
    { provide: UniqueEmailIdValidator, useClass: DuplicateEmailIdValidatorService }
  ]
})
export class SignupComponent {
  public readonly loading$ = new BehaviorSubject(false);

  constructor(
    private readonly actionsDispatcher: StoreActionDispatcher,
    private readonly router: Router,
    private readonly toastService: SwToastService
  ) {}

  public handleSignup(formData: SignupFormData) {
    const { emailId, password, username } = formData;
    this.actionsDispatcher
      .dispatchAsyncAction(
        createAccountAction({ emailId, password, username }),
        createAccountSuccessAction,
        createAccountErrorAction,
        this.loading$
      )
      .subscribe({
        next: () => {
          this.router.navigate(['app', 'projects']);
        },
        error: () => {
          this.toastService.error({
            message: "Error in creating account"
          })
        },
      });
  }
}
