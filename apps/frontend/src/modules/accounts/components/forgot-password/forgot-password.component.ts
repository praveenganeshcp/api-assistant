import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
} from 'ngx-simple-widgets';
import { RouterModule } from '@angular/router';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  resetForgotPasswordState,
  sendPasswordResetLinkAction,
} from '@api-assistant/auth-fe';
import {
  isPasswordResetLinkSentSelector,
  sendPasswordResetLinkInProgressSelector,
  sendResetPasswordLinkErrorMessageSelector,
} from '@api-assistant/auth-fe';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/app.state';

@Component({
  selector: 'api-assistant-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
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
export class ForgotPasswordComponent implements OnDestroy {
  /**
   * Whether send password reset link in progress
   */
  public resetPasswordLinkInProgress$: Observable<boolean> = this.store.select(
    sendPasswordResetLinkInProgressSelector
  );

  public isPasswordResetLinkSent$: Observable<boolean> = this.store.select(
    isPasswordResetLinkSentSelector
  );

  public passwordResetErrorMessage$: Observable<string> = this.store.select(
    sendResetPasswordLinkErrorMessageSelector
  );

  public resetPasswordLinkForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  public get sendResetPasswordLinkEmailIdControl() {
    return this.resetPasswordLinkForm.get('emailId');
  }

  constructor(private store: Store<AppState>) {}

  public handleSendPasswordResetLink() {
    this.store.dispatch(
      sendPasswordResetLinkAction({
        emailId: this.resetPasswordLinkForm.value.emailId as string,
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetForgotPasswordState());
  }
}
