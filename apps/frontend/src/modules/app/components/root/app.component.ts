import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { of, startWith, delay } from "rxjs";
import { CommonModule } from '@angular/common';
import { loadUserProfile } from '../../../accounts/store/accounts.actions';
import { isAuthUserLoadingSelector } from '../../../accounts/store/accounts.selectors';
import { AppState } from '../../store/appstate';
import { ProfileLoaderComponent } from '../profile-loader/profile-loader.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ProfileLoaderComponent
  ],
  selector: 'api-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor() {}

  public isUserProfileLoading$ = of(false).pipe(
    startWith(true),
    delay(2000)
  );

  ngOnInit() {
  }
}

