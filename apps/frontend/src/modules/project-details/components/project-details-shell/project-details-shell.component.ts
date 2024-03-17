import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwTabViewComponent,
  SwTabComponent,
  SwTabTitleComponent,
  SwTabContentComponent,
  SwIconComponent,
  SwLoaderComponent,
} from 'ngx-simple-widgets';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectHomeComponent } from '../project-home/project-home.component';
import { ProjectDatabaseComponent } from '../project-database/project-database.component';
import { ProjectSettingsComponent } from '../project-settings/project-settings.component';
import { ProjectFilesComponent } from '../project-files/project-files.component';
import { loadProjectDetailsAction } from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import {
  projectDetailsErrorSelector,
  projectDetailsLoadingSelector,
  projectOverviewSelector,
} from '../../store/selectors';
import { Observable, map } from 'rxjs';
import { ProjectExperimentComponent } from '../project-experiment/project-experiment.component';
import { BreakPointObserver, StoreActionDispatcher } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-project-details-shell',
  standalone: true,
  imports: [
    CommonModule,
    SwTabViewComponent,
    SwTabComponent,
    SwTabTitleComponent,
    SwTabContentComponent,
    SwIconComponent,
    RouterModule,
    ProjectHomeComponent,
    ProjectExperimentComponent,
    ProjectDatabaseComponent,
    ProjectSettingsComponent,
    ProjectFilesComponent,
    SwLoaderComponent,
  ],
  templateUrl: './project-details-shell.component.html',
  styleUrls: ['./project-details-shell.component.scss'],
})
export class ProjectDetailsShellComponent {
  public readonly loading$ = this.store.select(projectDetailsLoadingSelector);

  public readonly loadingError$ = this.store.select(
    projectDetailsErrorSelector
  );

  public readonly projectName$: Observable<string> = this.store
    .select(projectOverviewSelector)
    .pipe(map((projectData) => projectData?.name ?? ''));

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver,
    private actionsDispatcher: StoreActionDispatcher,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.actionsDispatcher.dispatchAction(
      loadProjectDetailsAction({
        projectId: this.projectId,
      })
    );
  }

  public get projectId(): string {
    return this.activatedRoute.snapshot.params['projectId'];
  }

  activeTabIndex = 0;

  public isDesktopScreen$ = this.breakpointObserver.isDesktopScreen$;

  onTabChange(index: number) {
    this.activeTabIndex = index;
  }
}
