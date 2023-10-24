import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { logoutAccount } from '../../../accounts/store/actions';
import { isProfileVerifiedSelector } from '../../../accounts/store/selectors';
import { Observable } from 'rxjs';
import { SwButtonComponent, SwIconComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, SwButtonComponent, SwIconComponent],
})
export class AppHeaderComponent {
  constructor(private store: Store<any>) {}

  public handleLogout() {
    this.store.dispatch(logoutAccount());
  }

  public isAccountVerified$: Observable<boolean | undefined> =
    this.store.select(isProfileVerifiedSelector);
}
