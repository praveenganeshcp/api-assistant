import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { profileSelector } from '../../../accounts/store/selectors';
import { AppState } from '../../app.state';

@Component({
  selector: 'api-assistant-profile-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.scss'],
})
export class ProfileLoaderComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.store.select(profileSelector).pipe(
      filter(profile => !profile.isLoading),
      take(1),
    ).subscribe(_ => {
      const nextUrl = this.activatedRoute.snapshot.queryParamMap.get('next')
      if(nextUrl !== null) {
        this.router.navigate([nextUrl])
      }
    })
  }
}
