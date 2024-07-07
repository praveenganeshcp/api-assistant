import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwIconComponent,
  SwLoaderComponent,
  SwTabComponent,
  SwTabContentComponent,
  SwTabTitleComponent,
  SwTabViewComponent,
} from 'ngx-simple-widgets';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../app/app.state';
import {
  BreakPointObserver,
  StoreActionDispatcher,
} from '@api-assistant/commons-fe';
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
import { loadApplicationDetailsAction } from '../../store/actions';

@Component({
  selector: 'api-assistant-project-details-host',
  standalone: true,
  imports: [
    CommonModule,
    SwTabComponent,
    SwIconComponent,
    SwTabContentComponent,
    SwTabTitleComponent,
    SwTabViewComponent,
    RouterModule,
    SwLoaderComponent,
    ApplicationAnalyticsHostComponent,
    ApplicationExperimentHostComponent,
    ApplicationDatabaseHostComponent,
    ApplicationFilesHostComponent,
    ApplicationSettingsHostComponent,
  ],
  templateUrl: './project-details-host.component.html',
  styleUrls: ['./project-details-host.component.scss'],
})
export class ProjectDetailsHostComponent {
  public readonly loading$ = this.store.select(applicationDataLoadingSelector);

  public readonly loadingError$ = this.store.select(
    applicationDataErrorSelector
  );

  public readonly projectName$: Observable<string> = this.store
    .select(applicationDataSelector)
    .pipe(map((projectData) => projectData.data?.name ?? ''));

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver,
    private actionsDispatcher: StoreActionDispatcher,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.actionsDispatcher.dispatchAction(
      loadApplicationDetailsAction({
        applicationId: this.applicationId,
      })
    );
  }

  public get applicationId(): string {
    return this.activatedRoute.snapshot.params['applicationId'];
  }

  activeTabIndex = 0;

  public isDesktopScreen$ = this.breakpointObserver.isDesktopScreen$;

  onTabChange(index: number) {
    this.activeTabIndex = index;
  }
}
