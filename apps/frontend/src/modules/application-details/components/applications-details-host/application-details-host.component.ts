import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwIconComponent,
  SwLoaderComponent,
  SwTabViewComponent,
} from 'ngx-simple-widgets';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { BreakPointObserver } from '@api-assistant/commons-fe';
import { Store } from '@ngrx/store';
import {
  applicationDataErrorSelector,
  applicationDataLoadingSelector,
  applicationDataSelector,
} from '../../store/selectors';
import { ApplicationEndpointsHostComponent } from '../../../application-endpoints/components/application-endpoints-host/application-endpoints-host.component';

enum TabNames {
  ENDPOINTS = 'Endpoints',
  SETTINGS = 'Settings',
  DATABASE = 'Database',
  MIGRATIONS = 'Migrations',
}

const routeUrlTabMapping: Record<TabNames, string> = {
  [TabNames.DATABASE]: 'database',
  [TabNames.ENDPOINTS]: 'endpoints',
  [TabNames.MIGRATIONS]: 'migrations',
  [TabNames.SETTINGS]: 'settings',
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
    ApplicationEndpointsHostComponent,
  ],
  templateUrl: './application-details-host.component.html',
  styleUrls: ['./application-details-host.component.scss'],
})
export class ApplicationDetailsHostComponent {
  protected readonly tabNames: TabNames[] = [
    TabNames.ENDPOINTS,
    TabNames.MIGRATIONS,
    TabNames.DATABASE,
    TabNames.SETTINGS,
  ];

  public readonly loading$ = this.store.select(applicationDataLoadingSelector);

  public readonly loadingError$ = this.store.select(
    applicationDataErrorSelector
  );

  public readonly applicationName$: Observable<string> = this.store
    .select(applicationDataSelector)
    .pipe(
      filter((applicationData) => !!applicationData),
      map((applicationData) => applicationData?.name ?? '')
    );

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
