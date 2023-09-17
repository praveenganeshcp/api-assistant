import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { accountRoutes } from './account-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AccountsEffects } from './store/accounts.effects';
import { StoreModule } from '@ngrx/store';
import { accountsReducer } from './store/accounts.reducer';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountsShellComponent } from './pages/accounts-shell/accounts-shell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  SwInputComponent, 
  SwButtonComponent,
  SwLoaderComponent
} from 'ngx-simple-widgets';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { AccountRoutesHeaderComponent } from "./pages/account-routes-header/account-routes-header.component";

export const ACCOUNTS_STATE_SELECTOR_KEY = 'accounts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes),
    EffectsModule.forFeature(AccountsEffects),
    StoreModule.forFeature(ACCOUNTS_STATE_SELECTOR_KEY, accountsReducer),
    ReactiveFormsModule,
    SwButtonComponent,
    SwInputComponent,
    SwLoaderComponent
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AccountsShellComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    AccountRoutesHeaderComponent
  ],
})
export class AccountsModule {}
