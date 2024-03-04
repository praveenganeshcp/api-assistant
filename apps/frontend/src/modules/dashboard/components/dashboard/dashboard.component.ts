import { Component, OnInit } from '@angular/core';
import {
  CanBeNull,
  SwButtonComponent,
  SwDialogModule,
  SwDialogService,
  SwLoaderComponent,
} from 'ngx-simple-widgets';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DashboardProjectCardComponent } from '../dashboard-project-card/dashboard-project-card.component';
import { Project } from '../../store/dashboard.state';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import {
  isProjectsLoadingSelector,
  projectsSelector,
} from '../../store/dashboard.selector';
import { loadProjectsAction } from '../../store/dashboard.actions';

@Component({
  selector: 'api-assistant-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwButtonComponent,
    DashboardProjectCardComponent,
    SwDialogModule,
    SwLoaderComponent,
  ],
})
export class DashboardComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(
    isProjectsLoadingSelector
  );

  projects$: Observable<Project[]> = this.store.select(projectsSelector);

  constructor(
    private swDialogService: SwDialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadProjectsAction());
  }

  public trackProject(_: number, project: Project) {
    return project.id;
  }

  public openCreateProjectModal() {
    const ref = this.swDialogService.open(CreateProjectComponent);
    ref.afterClosed$.subscribe((project) => {
      project = project as CanBeNull<Project>;
      if(!!project) {
        this.store.dispatch(loadProjectsAction());
      }
    });
  }
}
