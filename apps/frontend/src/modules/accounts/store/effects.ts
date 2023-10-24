// my-feature.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadProfile,
  profileLoaded,
  errorInLoadingProfile,
  createAccount,
  createAccountSuccess,
  createAccountError,
  loginAccount,
  loginSuccess,
  loginError,
  logoutAccount,
  logoutSuccess,
  logoutError,
  verifyAccount,
  verifyAccountSuccess,
  verifyAccountError,
  sendPasswordResetLink,
  sendPasswordResetLinkError,
  sendPasswordResetLinkSuccess,
} from './actions';
import { AccountsService } from '../services/accounts.service';
import { Router } from '@angular/router';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile), // Your action to trigger the effect
      mergeMap(() => {
        return this.accountsService.fetchUserProfile().pipe(
          map((data) => profileLoaded({ data })),
          catchError(() =>
            of(errorInLoadingProfile({ error: 'Error in fetching profile' }))
          )
        );
      })
    )
  );

  loginAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAccount), // Your action to trigger the effect
      mergeMap(({ payload }) => {
        return this.accountsService
          .loginAccount(payload.emailId, payload.password)
          .pipe(
            map((data) => loginSuccess({ data })),
            tap(() => {
              this.router.navigate(['app', 'projects']);
            }),
            catchError(({ error }) => of(loginError({ error: error.message })))
          );
      })
    )
  );

  logoutAccount = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAccount), // Your action to trigger the effect
      mergeMap(() => {
        return this.accountsService.logoutAccount().pipe(
          map(() => logoutSuccess()),
          tap(() => {
            this.router.navigate(['accounts', 'login']);
          }),
          catchError(() => of(logoutError()))
        );
      })
    )
  );

  verifyAccount = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyAccount), // Your action to trigger the effect
      mergeMap(({ key }) => {
        return this.accountsService.verifyAccount(key).pipe(
          map((data) => {
            console.log(data);
            return verifyAccountSuccess({ data });
          }),
          tap(() => {
            this.router.navigate(['app', 'projects']);
          }),
          catchError(({ error }) =>
            of(verifyAccountError({ error: error.message }))
          )
        );
      })
    )
  );

  sendPasswordResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendPasswordResetLink), // Your action to trigger the effect
      mergeMap(({ emailId }) => {
        return this.accountsService.sendPasswordResetLink(emailId).pipe(
          map(() => sendPasswordResetLinkSuccess()),
          catchError(({ error }) =>
            of(sendPasswordResetLinkError({ error: error.message }))
          )
        );
      })
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccount), // Your action to trigger the effect
      mergeMap(({ payload }) => {
        const { emailId, password, username } = payload;
        return this.accountsService
          .createAccount(emailId, password, username)
          .pipe(
            map((data) => createAccountSuccess({ data })),
            tap(() => {
              this.router.navigate(['app', 'projects']);
            }),
            catchError(({ error }) =>
              of(createAccountError({ error: error.message }))
            )
          );
      })
    )
  );
}
