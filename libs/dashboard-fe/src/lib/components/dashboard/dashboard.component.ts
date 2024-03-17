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
import { GlobalState, Project } from '../../store/dashboard.state';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Store } from '@ngrx/store';
import { loadProjectsAction } from '../../store/dashboard.actions';
import { Router } from '@angular/router';
import { selectData, selectIsLoading } from '../../store/dashboard.reducers';

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
  ]
})
export class DashboardComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(
    selectIsLoading
  );

  projects$: Observable<Project[]> = this.store.select(selectData);

  constructor(
    private swDialogService: SwDialogService,
    private store: Store<GlobalState>,
    private router: Router
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
      if(!!project) {
        this.router.navigate(['app', 'projects', (project as CanBeNull<Project>)?.id])
      }
    });
  }
}
