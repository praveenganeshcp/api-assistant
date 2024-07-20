import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../app/app.state';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { ApplicationsGridViewComponent } from '@api-assistant/dashboard-fe';
import { Store } from '@ngrx/store';
import {
  applicationsListDataErrorSelector,
  applicationsListDataSelector,
  isApplicationListLoadingSelector,
} from '../../store/selectors';
import {
  SwButtonComponent,
  SwDialogModule,
  SwDialogService,
  SwInputComponent,
  SwLoaderComponent,
} from 'ngx-simple-widgets';
import { loadApplicationsAction } from '../../store/actions';
import { ApplicationDashboardView } from '@api-assistant/application-core';
import { FormsModule } from '@angular/forms';
import { CreateApplicationDialogComponent } from '../create-application-dialog/create-application-dialog.component';

@Component({
  selector: 'api-assistant-dashboard-host',
  standalone: true,
  imports: [
    CommonModule,
    SwLoaderComponent,
    ApplicationsGridViewComponent,
    SwInputComponent,
    FormsModule,
    SwButtonComponent,
    SwDialogModule,
  ],
  templateUrl: './dashboard-host.component.html',
  styleUrls: ['./dashboard-host.component.scss'],
})
export class DashboardHostComponent implements OnInit {
  protected searchTerm: string = '';

  protected readonly searchTerm$ = new BehaviorSubject('');

  private readonly applications$: Observable<ApplicationDashboardView[]> =
    this.store.select(applicationsListDataSelector);

  protected readonly applicationRows$: Observable<ApplicationDashboardView[]> =
    combineLatest([this.searchTerm$, this.applications$]).pipe(
      map(([searchTerm, applications]) => {
        if (!searchTerm) {
          return applications;
        }
        return applications.filter((app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );

  protected readonly loading$: Observable<boolean> = this.store.select(
    isApplicationListLoadingSelector
  );

  protected readonly error$: Observable<string> = this.store.select(
    applicationsListDataErrorSelector
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogService: SwDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadApplicationsAction());
  }

  protected handleSearchQuery() {
    this.searchTerm$.next(this.searchTerm);
  }

  protected handleClickCreateApplication() {
    this.dialogService.open(CreateApplicationDialogComponent);
  }
}
