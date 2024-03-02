import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { logoutAccountAction, logoutErrorAction, logoutSuccessAction } from '@api-assistant/auth-fe';
import { isUserProfileVerifiedSelector } from '@api-assistant/auth-fe';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwButtonComponent, SwIconComponent, SwToastService } from 'ngx-simple-widgets';
import { StoreWrapper } from '../../../commons/StoreWrapper';
import { AppState } from '../../../app/app.state';

@Component({
  selector: 'api-assistant-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, SwButtonComponent, SwIconComponent],
})
export class AppShellComponent {

  private loading$ = new BehaviorSubject(false);

  constructor(
    private storeWrapper: StoreWrapper,
    private router: Router,
    private toastService: SwToastService,
    private store: Store<AppState>
  ) {}

  public handleLogout() {
    this.storeWrapper.dispatchAsyncAction(
      logoutAccountAction(),
      logoutSuccessAction,
      logoutErrorAction,
      this.loading$
    ).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastService.warn({
          message: "Error in logging out"
        })
      },
    })
  }

  public isAccountVerified$: Observable<boolean | undefined> =
    this.store.select(isUserProfileVerifiedSelector);
}
