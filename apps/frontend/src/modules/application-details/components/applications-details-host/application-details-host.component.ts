import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwIconComponent,
  SwLoaderComponent,
  SwTabViewComponent,
} from 'ngx-simple-widgets';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, Subject, filter, interval, map, startWith, takeUntil, timer } from 'rxjs';
import { AppState } from '../../../app/app.state';
import { BreakPointObserver } from '@api-assistant/commons-fe';
import { Store } from '@ngrx/store';
import {
  applicationDataErrorSelector,
  applicationDataLoadingSelector,
  applicationDataSelector,
} from '../../store/selectors';
import { ApplicationEndpointsHostComponent } from '../../../application-endpoints/components/application-endpoints-host/application-endpoints-host.component';
import { loadApplicationDetailsAction } from '../../store/actions';
import { fetchCloudCodeStatusAction } from '../../../application-cloud-code/store/actions';
import { processStateDataSelector } from '../../../application-cloud-code/store/selectors';

enum TabNames {
  ENDPOINTS = 'Endpoints',
  SETTINGS = 'Settings',
  DATABASE = 'Database',
  MIGRATIONS = 'Migrations',
  CLOUD_CODE = "Cloud code"
}

const routeUrlTabMapping: Record<TabNames, string> = {
  [TabNames.DATABASE]: 'database',
  [TabNames.ENDPOINTS]: 'endpoints',
  [TabNames.MIGRATIONS]: 'migrations',
  [TabNames.SETTINGS]: 'settings',
  [TabNames.CLOUD_CODE]: "cloud-code"
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
export class ApplicationDetailsHostComponent implements OnDestroy {
  protected readonly tabNames: TabNames[] = [
    TabNames.ENDPOINTS,
    TabNames.MIGRATIONS,
    TabNames.DATABASE,
    TabNames.CLOUD_CODE,
    TabNames.SETTINGS,
  ];

  private readonly destroy$ = new Subject();

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

  public readonly cloudCodeStatus$ = this.store.select(processStateDataSelector);

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver,
    private store: Store<AppState>,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  ngOnInit() {
    this.store.dispatch(
      loadApplicationDetailsAction({ applicationId: this.applicationId })
    );
    interval(5000).pipe(
      startWith(0),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.store.dispatch(
        fetchCloudCodeStatusAction({ applicationId: this.applicationId })
      )
    })
   
  }

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
