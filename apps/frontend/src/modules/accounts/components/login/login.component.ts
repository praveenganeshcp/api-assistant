import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SwButtonComponent, SwInputComponent } from 'ngx-simple-widgets';
import { loginAccountAction } from '../../store/actions';
import {
  isUserSigninInProgressSelector,
  loginErrorMessageSelector,
} from '../../store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { strongPasswordValidator } from '../../utils';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { SwFormControlComponent } from 'ngx-simple-widgets';

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

  /**
   * Is user login action in progress
   */
  public isLoginInProgress$: Observable<boolean> = this.store.select(
    isUserSigninInProgressSelector
  );

  private get loginSuccessCallbackUrl(): string {
    return this.route.snapshot.queryParamMap.get('next') ?? '/app/projects';
  }

  public readonly errorMessagesMap: Record<string, string> = {
    strongPassword:
      'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters',
  };

  public readonly loginErrorMessage$: Observable<string> = this.store.select(
    loginErrorMessageSelector
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
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
    const { emailId, password } = this.loginForm.value as {
      emailId: string;
      password: string;
    };
    this.store.dispatch(
      loginAccountAction({
        emailId,
        password,
        callbackUrl: this.loginSuccessCallbackUrl,
      })
    );
  }
}
