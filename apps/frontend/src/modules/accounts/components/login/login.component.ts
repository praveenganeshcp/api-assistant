import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  loginAccountAction,
  loginErrorAction,
  loginSuccessAction,
} from '../../store/actions';
import { LoginFormComponent, LoginFormData } from '@api-assistant/auth-fe';
import { SwToastService } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loading$ = new BehaviorSubject(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly actionsDispatcher: StoreActionDispatcher,
    private readonly router: Router,
    private readonly toastService: SwToastService
  ) {}

  private get loginSuccessCallbackUrl(): string {
    return this.route.snapshot.queryParamMap.get('next') ?? '/app/projects';
  }

  public handleLogin(formData: LoginFormData) {
    const { emailId, password } = formData;
    this.actionsDispatcher
      .dispatchAsyncAction(
        loginAccountAction({
          emailId,
          password,
        }),
        loginSuccessAction,
        loginErrorAction,
        this.loading$
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.loginSuccessCallbackUrl);
        },
        error: () => {
          this.toastService.error({
            message: "Error in signin"
          });
        },
      });
  }
}
