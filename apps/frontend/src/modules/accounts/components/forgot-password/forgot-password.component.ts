import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
  SwToastService,
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
  sendPasswordResetLinkAction,
  sendPasswordResetLinkErrorAction,
  sendPasswordResetLinkSuccessAction,
} from '@api-assistant/auth-fe';
import { BehaviorSubject, take } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { StoreWrapper } from '../../../commons/StoreWrapper';

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
 
  public loading$ = new BehaviorSubject(false);

  public resetPasswordLinkForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  public get sendResetPasswordLinkEmailIdControl() {
    return this.resetPasswordLinkForm.get('emailId');
  }

  constructor(
    private store: Store<AppState>,
    private toastService: SwToastService,
    private storeWrapper: StoreWrapper
  ) {}

  public handleSendPasswordResetLink() {

    this.storeWrapper.dispatchAsyncAction(
      sendPasswordResetLinkAction({emailId: this.resetPasswordLinkForm.value.emailId as string}),
      sendPasswordResetLinkSuccessAction,
      sendPasswordResetLinkErrorAction,
      this.loading$
    ).subscribe({
      next: (_) => {
        this.toastService.success({ 
          title: "Reset password",
          message: "Password reset link sent to your email" 
        })
        this.resetPasswordLinkForm.reset()
      },
      error: (exception: ReturnType<typeof sendPasswordResetLinkErrorAction>) => {
        this.toastService.error({ 
          title: "Reset password",
          message: exception.error
        })
      },
    })
  }

}
