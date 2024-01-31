import { Injectable} from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
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

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(profileSelector).pipe(
      map((profile) => {
        if(profile.isLoading) {
          return this.router.createUrlTree([''], {
            queryParams: { next: location.pathname }
          });
        }
        else if(profile.data !== null && profile.data?.isVerified) {
          this.swToastService.error({
            title: 'Already logged in',
            message: '',
          });
          return false;
        }
        return true;
      })
    );
  }
}
