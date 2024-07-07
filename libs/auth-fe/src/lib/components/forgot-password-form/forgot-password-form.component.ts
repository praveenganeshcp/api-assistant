import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
} from 'ngx-simple-widgets';
import { RouterModule } from '@angular/router';

import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'api-assistant-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
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
export class ForgotPasswordFormComponent {
  @Input() loading: boolean = false;

  @Input() loginLink: string = '';

  @Output() submitData = new EventEmitter<string>();

  public resetPasswordLinkForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  public get sendResetPasswordLinkEmailIdControl() {
    return this.resetPasswordLinkForm.get('emailId');
  }

  public handleSendPasswordResetLink() {
    if (this.resetPasswordLinkForm.valid) {
      this.submitData.emit(
        this.sendResetPasswordLinkEmailIdControl?.value ?? ''
      );
    }
  }
}
