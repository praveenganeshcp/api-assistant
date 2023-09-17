import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAccount } from '../../store/accounts.actions';
import { isAccountsAPIInProgressSelector } from '../../store/accounts.selectors';
import { AppState } from '../../../app/store/appstate';

@Component({
  selector: 'api-assistant-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  public isAccountsAPIInProgress$ = this.store.select(state => state.accounts.isAccountsAPIInProgress)

  public loginForm: FormGroup = this.createLoginForm();

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      emailId: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }


  public handleLogin() {
    this.store.dispatch(loginAccount(this.loginForm.value))
  }
}
