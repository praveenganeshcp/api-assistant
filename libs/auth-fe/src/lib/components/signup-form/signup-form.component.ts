import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
} from 'ngx-simple-widgets';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { strongPasswordValidator } from '../../utils';
import { SignupFormData, UniqueEmailIdValidator } from '../../models/accounts.types';

@Component({
  selector: 'api-assistant-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SwButtonComponent,
    SwInputComponent,
    SwFormControlComponent,
  ],
})
export class SignupFormComponent {
  @Input() loading: boolean = false;

  @Input() loginLink: string = '';

  @Output() submitData = new EventEmitter<SignupFormData>();

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

  public readonly usernameErrorMessages: Record<string, string> = {
    maxlength: 'Username cannot be more than 20 characters',
    minlength: 'Username must contain atleast 3 characters',
  };

  protected readonly errorMessagesMap: Record<string, string> = {
    strongPassword:
      'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters',
  };

  constructor(
    private formBuilder: FormBuilder,
    private uniqueEmailIdValidator: UniqueEmailIdValidator
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
          this.uniqueEmailIdValidator.validate.bind(this.uniqueEmailIdValidator),
        ]
      ),
    });
  }

  protected handleSignup() {
    if (this.signupForm.valid) {
      this.submitData.emit({
        emailId: this.emailIdControl.value,
        password: this.passwordControl.value,
        username: this.usernameControl.value,
      });
    }
  }
}
