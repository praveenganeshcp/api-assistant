import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
} from 'ngx-simple-widgets';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { DuplicateEmailIdValidatorService } from '@api-assistant/auth-fe';
import { strongPasswordValidator } from '@api-assistant/auth-fe';
import {
  createAccountAction,
  resetCreateAccountStateAction,
} from '@api-assistant/auth-fe';
import {
  createAccountErrorMessageSelector,
  isSignupInProgressSelector,
} from '@api-assistant/auth-fe';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/app.state';

@Component({
  selector: 'api-assistant-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SwButtonComponent,
    SwInputComponent,
    SwFormControlComponent,
    AlertBannerComponent,
  ],
})
export class SignupComponent implements OnDestroy {
  public signupForm = this.buildSignupFormGroup();

  public isSignupInProgress$: Observable<boolean> = this.store.select(
    isSignupInProgressSelector
  );

  public signupErrorMessage$: Observable<string> = this.store.select(
    createAccountErrorMessageSelector
  );

  public get usernameControl() {
    return this.signupForm.get('username') as FormControl;
  }

  public get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  public get emailIdControl() {
    return this.signupForm.get('emailId') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private duplicateEmailIdValidator: DuplicateEmailIdValidatorService,
    private store: Store<AppState>
  ) {}

  private buildSignupFormGroup() {
    return this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.min(3),
        Validators.max(20),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        strongPasswordValidator,
      ]),
      emailId: this.formBuilder.control(
        '',
        [Validators.required, Validators.email],
        [
          this.duplicateEmailIdValidator.validate.bind(
            this.duplicateEmailIdValidator
          ),
        ]
      ),
    });
  }

  public handleSignup() {
    const { emailId, password, username } = this.signupForm.value as {
      emailId: string;
      password: string;
      username: string;
    };
    this.store.dispatch(createAccountAction({ emailId, password, username }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCreateAccountStateAction());
  }
}
