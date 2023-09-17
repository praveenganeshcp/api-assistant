import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AccountsService } from "../services/accounts.service";
import { loadUserProfile, userProfileLoaded, errorInLoadingUserProfile, loginAccount, loginSuccess, loginError, logoutUser, logoutSuccess } from "./accounts.actions";
import { Router } from "@angular/router";

@Injectable()
export class AccountsEffects {

    fetchUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserProfile),
        exhaustMap(() => this.accountsService.fetchUserProfile()
          .pipe(
            map((authUser) => userProfileLoaded({authUser})),
            catchError(({error}) => {
              console.log(error)
              return of(errorInLoadingUserProfile({error: error.message || "Unauthorized"}))
            })
          ))
        )
      );

    loginAccount$ = createEffect(() => this.actions$.pipe(
      ofType(loginAccount),
      exhaustMap(({emailId, password}) => this.accountsService.loginAccount(emailId, password)
        .pipe(
          map((authUser) => loginSuccess({authUser})),
          catchError(({error}) => {
            console.log(error)
            return of(loginError({error: error?.message || "Unauthorized"}))
          })
        )
      
      )
    ))

    logoutAccount$ = createEffect(() => this.actions$.pipe(
      ofType(logoutUser),
      exhaustMap(() => this.accountsService.logoutAccount().pipe(
        map(() => logoutSuccess()),
        tap(() => this.router.navigate(['']))
      ))
    ))

    constructor(
      private actions$: Actions,
      private accountsService: AccountsService,
      private router: Router

    ) {}
}