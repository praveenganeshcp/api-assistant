import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwButtonComponent, SwInputComponent, SwFormControlComponent } from 'ngx-simple-widgets';
import { RouterModule } from '@angular/router';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendPasswordResetLink } from '../../store/actions';
import {
  sendPasswordResetLinkInProgress,
  isResetPasswordLinkSent,
  sendResetPasswordLinkErrorMessageSelector,
} from '../../store/selectors';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class ForgotPasswordComponent {
  constructor(private store: Store<AppState>) {}

  resetPasswordLinkForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  public get sendResetPasswordLinkEmailIdControl() {
    return this.resetPasswordLinkForm.get('emailId');
  }

  public handleSendPasswordResetLink() {
    this.store.dispatch(
      sendPasswordResetLink({
        emailId: this.resetPasswordLinkForm.value.emailId as string,
      })
    );
  }

  resetPasswordLinkInProgress$: Observable<boolean> = this.store.select(
    sendPasswordResetLinkInProgress
  );

  alertMessage$: Observable<string> = combineLatest([
    this.store.select(isResetPasswordLinkSent),
    this.store.select(sendResetPasswordLinkErrorMessageSelector),
  ]).pipe(
    map(([isLinkSent, errorMessage]) => {
      return isLinkSent ? 'Password reset link sent' : errorMessage || '';
    })
  );
}
