import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { appRoutes } from './app.routes';
import { StoreModule, provideStore } from '@ngrx/store';
import { AccountsModule } from '../accounts/accounts.module';
import { EffectsModule } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      BrowserAnimationsModule,
      AccountsModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      StoreDevtoolsModule.instrument(),
      HttpClientModule
    ]),
  ],
};

