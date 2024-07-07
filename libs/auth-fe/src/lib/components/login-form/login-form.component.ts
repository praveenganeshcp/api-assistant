import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CanBeNull,
  SwButtonComponent,
  SwInputComponent,
} from 'ngx-simple-widgets';
import { strongPasswordValidator } from '../../utils';
import { SwFormControlComponent } from 'ngx-simple-widgets';
import { AppInfoService } from '@api-assistant/commons-fe';
import { LoginFormData } from '../../models/accounts.types';

@Component({
  selector: 'api-assistant-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SwButtonComponent,
    SwInputComponent,
    ReactiveFormsModule,
    SwFormControlComponent,
  ],
})
export class LoginFormComponent {
  @Input() loading: CanBeNull<boolean> = false;

  @Input() signupLink: string = '';

  @Input() forgotPasswordLink: string = '';

  @Output() submitData = new EventEmitter<LoginFormData>();

  protected loginForm = this.createLoginForm();

  protected readonly errorMessagesMap: Record<string, string> = {
    strongPassword:
      'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters',
  };

  protected readonly appName: string = this.appInfoService.appName;

  constructor(
    private formBuilder: FormBuilder,
    private appInfoService: AppInfoService
  ) {}

  private createLoginForm() {
    return this.formBuilder.group({
      emailId: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        strongPasswordValidator,
      ]),
    });
  }

 get emailIdControl(): FormControl {
    return this.loginForm.get('emailId') as FormControl;
  }

  protected get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  protected handleLogin() {
    this.submitData.emit({
      emailId: this.emailIdControl.value,
      password: this.passwordControl.value,
    });
  }
}
