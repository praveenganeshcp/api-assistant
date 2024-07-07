import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  SwButtonComponent,
  SwIconComponent,
  SwToastService,
} from 'ngx-simple-widgets';
import { AppState } from '../../../app/app.state';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  logoutAccountAction,
  logoutErrorAction,
  logoutSuccessAction,
} from '../../../accounts/store/actions';

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
    private actionsDispatcher: StoreActionDispatcher,
    private router: Router,
    private toastService: SwToastService,
    private store: Store<AppState>
  ) {}

  public handleLogout() {
    this.actionsDispatcher
      .dispatchAsyncAction(
        logoutAccountAction(),
        logoutSuccessAction,
        logoutErrorAction,
        this.loading$
      )
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          this.toastService.warn({
            message: 'Error in logging out',
          });
        },
      });
  }

}
