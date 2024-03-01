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
import { DuplicateEmailIdValidatorService, createAccountErrorAction, createAccountSuccessAction } from '@api-assistant/auth-fe';
import { strongPasswordValidator } from '@api-assistant/auth-fe';
import {
  createAccountAction,
  resetCreateAccountStateAction,
} from '@api-assistant/auth-fe';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { Actions, ofType } from '@ngrx/effects';

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

  public get usernameControl() {
    return this.signupForm.get('username') as FormControl;
  }

  public get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  public get emailIdControl() {
    return this.signupForm.get('emailId') as FormControl;
  }

  public signupLoading: boolean = false;

  public signupErrorMessage: string = ""

  public readonly usernameErrorMessages: Record<string, string> = {
    maxLength: "Username cannot be more than 20 characters",
    minLength: "Username must contain atleast 3 characters"
  }

  constructor(
    private formBuilder: FormBuilder,
    private duplicateEmailIdValidator: DuplicateEmailIdValidatorService,
    private store: Store<AppState>,
    private actions: Actions
  ) {}

  private buildSignupFormGroup() {
    return this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
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
    this.signupLoading = true;
    this.store.dispatch(createAccountAction({ emailId, password, username }));

    this.actions.pipe(
      ofType(createAccountSuccessAction),
      take(1)
    ).subscribe(_ => {
      this.signupErrorMessage = "";
      this.signupLoading = false;
    })

    this.actions.pipe(
      ofType(createAccountErrorAction),
      take(1)
    ).subscribe(({ error }) => {
      this.signupErrorMessage = error;
      this.signupLoading = false;
    })

    
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCreateAccountStateAction());
  }
}
