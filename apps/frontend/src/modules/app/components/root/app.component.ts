import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileLoaderComponent } from '../profile-loader/profile-loader.component';
import { loadProfile } from '../../../accounts/store/actions';
import { isProfileLoadingSelector } from '../../../accounts/store/selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ProfileLoaderComponent],
  selector: 'api-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  public isUserProfileLoading$: Observable<boolean> = this.store.select(
    isProfileLoadingSelector
  );

  ngOnInit() {
    this.store.dispatch(loadProfile());
  }
}
