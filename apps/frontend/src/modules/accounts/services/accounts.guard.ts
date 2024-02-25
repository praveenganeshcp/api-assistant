import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { profileStateSelector } from '../store/selectors';
import { AppState } from '../../app/app.state';
import { Observable, map, tap, filter } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';

/**
 * Guard to protect logged in users to enter into
 * pages that requires users to be unauthenticated.
 */
@Injectable({ providedIn: 'root' })
export class AccountsGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private swToastService: SwToastService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(profileStateSelector).pipe(
      map((profile) => {
        // If user profile is loading, navigate to load page by setting callback url in next param
        if (profile.isLoading) {
          return this.router.createUrlTree(['load']);
        }
        // Show error message if already loggedin and do not allow to enter into route
        else if (profile.data !== null && profile.data?.isVerified) {
          this.swToastService.warn({
            title: 'Already logged in',
            message: '',
          });
          return this.router.createUrlTree(['app', 'projects']);
        }
        return true;
      })
    );
  }
}
