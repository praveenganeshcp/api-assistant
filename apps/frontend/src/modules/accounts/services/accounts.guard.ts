import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { profileSelector } from '../store/selectors';
import { AppState } from '../../app/app.state';
import { Observable, map, tap, filter } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';

@Injectable({ providedIn: 'root' })
export class AccountsGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private swToastService: SwToastService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(profileSelector).pipe(
      tap((profile) => {
        if (profile.isLoading) {
          this.router.navigate(['']);
        }
      }),
      map(
        (profileState) => !profileState.isLoading && profileState.data === null
      ),
      tap((isUserNotLoggedIn) => {
        if (!isUserNotLoggedIn) {
          this.swToastService.error({
            title: 'Already logged in',
            message: '',
          });
          this.router.navigate([]);
        }
      })
    );
  }
}
