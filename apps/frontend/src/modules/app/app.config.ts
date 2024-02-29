import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountsReducer } from '@api-assistant/auth-fe';
import { dashboardReducers } from '../dashboard/store/dashboard.reducers';
import { AccountsEffects } from '@api-assistant/auth-fe';
import { SwToastModule } from 'ngx-simple-widgets';
import { DashboardEffects } from '../dashboard/store/dashboard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      SwToastModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({
        accounts: accountsReducer,
        dashboard: dashboardReducers,
      }),
      EffectsModule.forRoot([AccountsEffects, DashboardEffects]),
      StoreDevtoolsModule.instrument(),
      HttpClientModule,
    ]),
  ],
};
