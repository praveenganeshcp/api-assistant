import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwButtonComponent, SwInputComponent } from 'ngx-simple-widgets';
import {
  loginAccountAction,
  loginErrorAction,
  loginSuccessAction,
} from '@api-assistant/auth-fe';
import { strongPasswordValidator } from '@api-assistant/auth-fe';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { SwFormControlComponent } from 'ngx-simple-widgets';
import { BehaviorSubject } from 'rxjs';
import {
  AppInfoService,
  StoreActionDispatcher,
} from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SwButtonComponent,
    SwInputComponent,
    ReactiveFormsModule,
    AlertBannerComponent,
    SwFormControlComponent,
  ],
})
export class LoginComponent {
  public loginForm = this.createLoginForm();

  private get loginSuccessCallbackUrl(): string {
    return this.route.snapshot.queryParamMap.get('next') ?? '/app/projects';
  }

  public readonly errorMessagesMap: Record<string, string> = {
    strongPassword:
      'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters',
  };

  public readonly appName: string = this.appInfoService.appName;

  public loading$ = new BehaviorSubject(false);

  public loginErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private actionsDispatcher: StoreActionDispatcher,
    private route: ActivatedRoute,
    private appInfoService: AppInfoService,
    private router: Router
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

  public get emailIdControl(): FormControl {
    return this.loginForm.get('emailId') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public handleLogin() {
    this.loginErrorMessage = '';
    const { emailId, password } = this.loginForm.value as {
      emailId: string;
      password: string;
    };
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
          this.router.navigate([this.loginSuccessCallbackUrl]);
        },
        error: (err: ReturnType<typeof loginErrorAction>) => {
          this.loginErrorMessage = err.error;
        },
      });
  }
}
