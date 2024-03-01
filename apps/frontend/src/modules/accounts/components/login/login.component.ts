import { Component, OnDestroy } from '@angular/core';
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
  resetLoginStateAction,
} from '@api-assistant/auth-fe';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { strongPasswordValidator } from '@api-assistant/auth-fe';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { SwFormControlComponent } from 'ngx-simple-widgets';
import { AppInfoService } from '../../../commons/app-info-service/app-info.service';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

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
export class LoginComponent implements OnDestroy {
  public loginForm = this.createLoginForm();

  private get loginSuccessCallbackUrl(): string {
    return this.route.snapshot.queryParamMap.get('next') ?? '/app/projects';
  }

  public readonly errorMessagesMap: Record<string, string> = {
    strongPassword:
      'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters',
  };

  public readonly appName: string = this.appInfoService.appName;

  public isLoginProgress: boolean = false;

  public loginErrorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private appInfoService: AppInfoService,
    private actions: Actions,
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
    const { emailId, password } = this.loginForm.value as {
      emailId: string;
      password: string;
    };
    this.isLoginProgress = true;
    this.store.dispatch(
      loginAccountAction({
        emailId,
        password
      })
    );
    this.actions.pipe(
      ofType(loginErrorAction),
      take(1)
    ).subscribe(({ error }) => {
      this.loginErrorMessage = error;
      this.isLoginProgress = false;
    })

    this.actions.pipe(
      ofType(loginSuccessAction),
      take(1),
    ).subscribe(s => {
      this.router.navigate([this.loginSuccessCallbackUrl]);
      this.loginErrorMessage = "";
      this.isLoginProgress = false;
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetLoginStateAction());
  }
}
