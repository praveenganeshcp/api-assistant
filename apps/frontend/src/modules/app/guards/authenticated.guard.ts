import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';
import { AppState } from '../app.state';
import { profileStateSelector } from '../../accounts/store/selectors';

/**
 * prevents unauthenticated user access to app
 */
@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private swToastService: SwToastService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(profileStateSelector).pipe(
      map((profile) => {
        // If user profile is loading, navigate to loading screen with callback url
        if (profile.isLoading) {
          return this.router.createUrlTree(['load'], {
            queryParams: { next: location.pathname },
          });
        }
        // if user is not authenticated, do not allow access
        else if (profile.data === null) {
          this.swToastService.error({
            message: 'Session expired'
          });
          return this.router.createUrlTree(['accounts', 'login']);
        }
        return true;
      })
    );
  }
}
