import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createAccountAction,
  createAccountErrorAction,
  createAccountSuccessAction,
  errorInLoadingProfileAction,
  loadProfileAction,
  loginAccountAction,
  loginErrorAction,
  loginSuccessAction,
  logoutAccountAction,
  logoutErrorAction,
  logoutSuccessAction,
  profileLoadedAction,
  sendPasswordResetLinkAction,
  sendPasswordResetLinkErrorAction,
  sendPasswordResetLinkSuccessAction,
  verifyAccountAction,
  verifyAccountErrorAction,
  verifyAccountSuccessAction,
} from './actions';
import { AccountsService, UserProfile } from '@api-assistant/auth-fe';

/**
 * Handles user account action side effects
 */
@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService
  ) {}

  /**
   * Loads user profile when action is dispatched
   */
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileAction),
      mergeMap(() => {
        return this.accountsService.fetchUserProfile().pipe(
          map((userProfile: UserProfile) =>
            profileLoadedAction({ userProfile })
          ),
          catchError(() =>
            of(
              errorInLoadingProfileAction({
                error: 'Error in fetching profile',
              })
            )
          )
        );
      })
    )
  );

  /**
   * Handles user login action
   */
  loginAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAccountAction),
      mergeMap(({ emailId, password }) => {
        return this.accountsService.loginAccount(emailId, password).pipe(
          map((userProfile: UserProfile) => {
            return loginSuccessAction({ userProfile });
          }),
          catchError(({ error }) =>
            of(loginErrorAction({ error: error.message }))
          )
        );
      })
    )
  );

  /**
   * Handles user logout action
   */
  logoutAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAccountAction),
      mergeMap(() => {
        return this.accountsService.logoutAccount().pipe(
          map(() => logoutSuccessAction()),
          catchError(() => of(logoutErrorAction()))
        );
      })
    )
  );

  /**
   * verifies user account
   */
  verifyAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyAccountAction),
      mergeMap(({ key }) => {
        return this.accountsService.verifyAccount(key).pipe(
          map((userProfile) => verifyAccountSuccessAction({ userProfile })),
          catchError(({ error }) =>
            of(verifyAccountErrorAction({ error: error.message }))
          )
        );
      })
    )
  );

  /**
   * Send password reset link
   */
  sendPasswordResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendPasswordResetLinkAction),
      mergeMap(({ emailId }) => {
        return this.accountsService.sendPasswordResetLink(emailId).pipe(
          map(() => sendPasswordResetLinkSuccessAction()),
          catchError(({ error }) =>
            of(sendPasswordResetLinkErrorAction({ error: error.message }))
          )
        );
      })
    )
  );

  /**
   * Create user account
   */
  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccountAction),
      mergeMap(({ emailId, password, username }) => {
        return this.accountsService
          .createAccount(emailId, password, username)
          .pipe(
            map((userProfile: UserProfile) =>
              createAccountSuccessAction({ userProfile })
            ),
            catchError(({ error }) =>
              of(createAccountErrorAction({ error: error.message }))
            )
          );
      })
    )
  );
}
