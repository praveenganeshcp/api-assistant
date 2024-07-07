import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  sendPasswordResetLinkAction,
  sendPasswordResetLinkErrorAction,
  sendPasswordResetLinkSuccessAction,
} from '../../store/actions';
import { SwToastService } from 'ngx-simple-widgets';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordFormComponent } from '@api-assistant/auth-fe';

@Component({
  selector: 'api-assistant-forgot-password',
  standalone: true,
  imports: [CommonModule, ForgotPasswordFormComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  public loading$ = new BehaviorSubject(false);

  constructor(
    private readonly actionsDispatcher: StoreActionDispatcher,
    private readonly toastService: SwToastService
  ) {}

  public handleSendPasswordResetLink(emailId: string) {
    this.actionsDispatcher
      .dispatchAsyncAction(
        sendPasswordResetLinkAction({
          emailId,
        }),
        sendPasswordResetLinkSuccessAction,
        sendPasswordResetLinkErrorAction,
        this.loading$
      )
      .subscribe({
        next: (_) => {
          this.toastService.success({
            title: 'Reset password',
            message: 'Password reset link sent to provided email',
          });
        },
        error: () => {
          this.toastService.error({
            title: 'Reset password',
            message: 'Error in sending password reset link',
          });
        },
      });
  }
}
