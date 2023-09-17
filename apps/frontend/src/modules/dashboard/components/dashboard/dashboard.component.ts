import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProjects } from '../../store/dashboard.actions';
import { isProjectsLoadingSelector, projectsSelector } from '../../store/dashboard.selector';
import { CreateProjectComponent } from "../create-project/create-project.component"
import { SwDialogService } from "ngx-simple-widgets";

@Component({
  selector: 'api-assistant-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private store: Store,
    private dialogService: SwDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProjects())
  }

  public openCreateProjectModal() {
    this.dialogService.open(CreateProjectComponent)
  }

  isProjectsLoading$ = this.store.select(isProjectsLoadingSelector);

  projects$ = this.store.select(projectsSelector);
}
