import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwIconComponent,
  SwLoaderComponent,
  SwTabViewComponent,
} from 'ngx-simple-widgets';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { BreakPointObserver } from '@api-assistant/commons-fe';
import { Store } from '@ngrx/store';
import { ApplicationAnalyticsHostComponent } from '../application-analytics-host/application-analytics-host.component';
import { ApplicationExperimentHostComponent } from '../application-experiment-host/application-experiment-host.component';
import { ApplicationDatabaseHostComponent } from '../application-database-host/application-database-host.component';
import { ApplicationFilesHostComponent } from '../application-files-host/application-files-host.component';
import { ApplicationSettingsHostComponent } from '../application-settings-host/application-settings-host.component';
import {
  applicationDataErrorSelector,
  applicationDataLoadingSelector,
  applicationDataSelector,
} from '../../store/selectors';
import { ApplicationEndpointsHostComponent } from '../../../endpoints/components/application-endpoints-host/application-endpoints-host.component';

enum TabNames {
  ENDPOINTS = 'Endpoints',
  SETTINGS = 'Settings',
  USERS = 'Users',
  DATABASE = 'Database',
}

const routeUrlTabMapping: Record<TabNames, string> = {
  [TabNames.DATABASE]: 'database',
  [TabNames.ENDPOINTS]: 'endpoints',
  [TabNames.SETTINGS]: 'settings',
  [TabNames.USERS]: 'users',
};

@Component({
  selector: 'api-assistant-application-details-host',
  standalone: true,
  imports: [
    CommonModule,
    SwIconComponent,
    SwTabViewComponent,
    RouterModule,
    SwLoaderComponent,
    ApplicationAnalyticsHostComponent,
    ApplicationExperimentHostComponent,
    ApplicationDatabaseHostComponent,
    ApplicationFilesHostComponent,
    ApplicationSettingsHostComponent,
    ApplicationEndpointsHostComponent,
  ],
  templateUrl: './application-details-host.component.html',
  styleUrls: ['./application-details-host.component.scss'],
})
export class ApplicationDetailsHostComponent {
  protected readonly tabNames: TabNames[] = [
    TabNames.ENDPOINTS,
    TabNames.DATABASE,
    TabNames.USERS,
    TabNames.SETTINGS,
  ];

  public readonly loading$ = this.store.select(applicationDataLoadingSelector);

  public readonly loadingError$ = this.store.select(
    applicationDataErrorSelector
  );

  public readonly applicationName$: Observable<string> = this.store
    .select(applicationDataSelector)
    .pipe(map((applicationData) => applicationData.data?.name ?? ''));

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver,
    private store: Store<AppState>,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  public get applicationId(): string {
    return this.activatedRoute.snapshot.params['applicationId'];
  }

  activeTabIndex = 0;

  public isDesktopScreen$ = this.breakpointObserver.isDesktopScreen$;

  handleTabChange(index: number) {
    this.activeTabIndex = index;
    const url: string = routeUrlTabMapping[this.tabNames[index]];
    this.router.navigate([url], {
      relativeTo: this.activatedRoute,
    });
  }
}
