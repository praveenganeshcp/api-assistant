import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
} from '@api-assistant/auth-fe';
import { BehaviorSubject, take } from 'rxjs';
import { StoreWrapper } from '../../../commons/StoreWrapper';

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
export class SignupComponent {
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

  public loading$ = new BehaviorSubject(false);

  public signupErrorMessage: string = ""

  public readonly usernameErrorMessages: Record<string, string> = {
    maxLength: "Username cannot be more than 20 characters",
    minLength: "Username must contain atleast 3 characters"
  }

  constructor(
    private formBuilder: FormBuilder,
    private duplicateEmailIdValidator: DuplicateEmailIdValidatorService,
    private storeWrapper: StoreWrapper,
    private router: Router
  ) {
  }

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
    this.signupErrorMessage = "";
    const { emailId, password, username } = this.signupForm.value as {
      emailId: string;
      password: string;
      username: string;
    };
    this.storeWrapper.dispatchAsyncAction(
      createAccountAction({ emailId, password, username }),
      createAccountSuccessAction,
      createAccountErrorAction,
      this.loading$
    ).subscribe({
      next: () => {
        this.router.navigate(['app', 'projects']);
      },
      error: (err: ReturnType<typeof createAccountErrorAction>) => {
        this.signupErrorMessage = err.error;
      }
    })

  }
}
