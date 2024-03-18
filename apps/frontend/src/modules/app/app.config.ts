import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  PROFILE_STATE_SLICE_NAME,
  accountsReducer,
} from '@api-assistant/auth-fe';
import { AccountsEffects } from '@api-assistant/auth-fe';
import { SwToastModule } from 'ngx-simple-widgets';
import { API_BASE_URL } from '@api-assistant/commons-fe';
import { environment } from '../../environments/environment.dev';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
    provideStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      SwToastModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({
        [PROFILE_STATE_SLICE_NAME]: accountsReducer,
      }),
      EffectsModule.forRoot([AccountsEffects]),
      StoreDevtoolsModule.instrument(),
      HttpClientModule,
    ]),
  ],
};
