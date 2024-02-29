import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { logoutAccountAction } from '@api-assistant/auth-fe';
import { isUserProfileVerifiedSelector } from '@api-assistant/auth-fe';
import { Observable } from 'rxjs';
import { SwButtonComponent, SwIconComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, SwButtonComponent, SwIconComponent],
})
export class AppShellComponent {
  constructor(private store: Store<any>) {}

  public handleLogout() {
    this.store.dispatch(logoutAccountAction());
  }

  public isAccountVerified$: Observable<boolean | undefined> =
    this.store.select(isUserProfileVerifiedSelector);
}
