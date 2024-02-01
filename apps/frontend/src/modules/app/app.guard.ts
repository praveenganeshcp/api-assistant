import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap, filter } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';
import { AppState } from './app.state';
import { profileSelector } from '../accounts/store/selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private swToastService: SwToastService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(profileSelector).pipe(
        map((profile) => {
          if(profile.isLoading) {
            return this.router.createUrlTree(['load'], {
              queryParams: { next: location.pathname }
            });
          }
          else if(profile.data === null) {
            this.swToastService.error({
              title: 'Session expired',
              message: '',
            });
            return false;
          }
          return true;
        })
      );
  }
}
