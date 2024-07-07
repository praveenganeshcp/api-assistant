import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../app/app.state';
import { Observable } from 'rxjs';
import {
  Application,
  ApplicationsListViewComponent,
} from '@api-assistant/dashboard-fe';
import { Store } from '@ngrx/store';
import {
  applicationsListDataErrorSelector,
  applicationsListDataSelector,
  isApplicationListLoadingSelector,
} from '../../store/selectors';
import { SwLoaderComponent } from 'ngx-simple-widgets';
import { loadApplicationsAction } from '../../store/actions';

@Component({
  selector: 'api-assistant-dashboard-host',
  standalone: true,
  imports: [CommonModule, SwLoaderComponent, ApplicationsListViewComponent],
  templateUrl: './dashboard-host.component.html',
  styleUrls: ['./dashboard-host.component.scss'],
})
export class DashboardHostComponent implements OnInit {
  protected readonly applications$: Observable<Application[]> =
    this.store.select(applicationsListDataSelector);

  protected readonly loading$: Observable<boolean> = this.store.select(
    isApplicationListLoadingSelector
  );

  protected readonly error$: Observable<string> = this.store.select(
    applicationsListDataErrorSelector
  );

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadApplicationsAction());
  }
}
