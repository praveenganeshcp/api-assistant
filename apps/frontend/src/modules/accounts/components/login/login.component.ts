import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwButtonComponent, SwInputComponent } from 'ngx-simple-widgets';
import { loginAccount } from '../../store/actions';
import {
  isUserLoggingInSelector,
  loginErrorMessageSelector,
} from '../../store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { strongPasswordValidator } from '../../utils';
import { FormControlComponent } from '../form-control/form-control.component';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

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
    FormControlComponent,
    AlertBannerComponent,
  ],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  public loginForm: FormGroup = this.createLoginForm();

  private createLoginForm(): FormGroup {
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

  public isLoginInProgress$: Observable<boolean> = this.store.select(
    isUserLoggingInSelector
  );

  public loginErrorMessage$: Observable<string> = this.store.select(
    loginErrorMessageSelector
  );

  public handleLogin() {
    this.store.dispatch(loginAccount({ payload: this.loginForm.value }));
  }
}
