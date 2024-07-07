import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileLoaderComponent } from '../profile-loader/profile-loader.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadProfileAction } from '../../../accounts/store/actions';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ProfileLoaderComponent],
  selector: 'api-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadProfileAction());
  }
}
