import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authUserSelector } from '../../../accounts/store/accounts.selectors';
import { logoutUser } from '../../../accounts/store/accounts.actions';

@Component({
  selector: 'api-assistant-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  constructor(
    private store: Store
  ) {}

  public authenticatedUser$ = this.store.select(authUserSelector);

  public handleLogout() {
    this.store.dispatch(logoutUser());
  }
}
