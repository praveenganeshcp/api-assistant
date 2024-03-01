import { Component, OnDestroy } from '@angular/core';
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
  resetForgotPasswordState,
  sendPasswordResetLinkAction,
  sendPasswordResetLinkErrorAction,
  sendPasswordResetLinkSuccessAction,
} from '@api-assistant/auth-fe';
import { take } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { Actions, ofType } from '@ngrx/effects';

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
 
  public loading: boolean = false;

  public resetPasswordLinkForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  public get sendResetPasswordLinkEmailIdControl() {
    return this.resetPasswordLinkForm.get('emailId');
  }

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private toastService: SwToastService
  ) {}

  public handleSendPasswordResetLink() {
    this.loading = true;

    this.store.dispatch(
      sendPasswordResetLinkAction({
        emailId: this.resetPasswordLinkForm.value.emailId as string,
      })
    );

    this.actions.pipe(
      ofType(sendPasswordResetLinkSuccessAction),
      take(1)
    ).subscribe(_ => {
      this.toastService.success({ 
        title: "Reset password",
        message: "Password reset link sent to your email" 
      })
      this.loading = false;
    })

    this.actions.pipe(
      ofType(sendPasswordResetLinkErrorAction),
      take(1)
    ).subscribe(({ error }) => {
      this.toastService.error({ 
        title: "Reset password",
        message: error
      })
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetForgotPasswordState());
  }
}
