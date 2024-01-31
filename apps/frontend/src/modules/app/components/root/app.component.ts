import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileLoaderComponent } from '../profile-loader/profile-loader.component';
import { loadProfile } from '../../../accounts/store/actions';
import { isProfileLoadingSelector, profileSelector } from '../../../accounts/store/selectors';
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
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public isUserProfileLoading$: Observable<boolean> = this.store.select(
    isProfileLoadingSelector
  );

  ngOnInit() {
    this.store.dispatch(loadProfile());
    this.store.select(profileSelector).pipe(
      filter(profile => !profile.isLoading),
      take(1)
    ).subscribe(_ => {
      const nextUrl = this.activatedRoute.snapshot.queryParamMap.get('next')
      if(nextUrl !== null) {
        this.router.navigate([nextUrl])
      }
    })
  }
}
