import { Component, OnInit } from '@angular/core';
import { 
  SwButtonComponent,
  SwDialogModule,
  SwDialogService,
  SwLoaderComponent
} from "ngx-simple-widgets";
import { Observable, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { DashboardProjectCardComponent } from "../dashboard-project-card/dashboard-project-card.component";
import { Project } from "../../store/dashboard.state";
import { CreateProjectComponent } from "../create-project/create-project.component";


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
    SwLoaderComponent
  ]
})
export class DashboardComponent implements OnInit {

  isLoading$: Observable<boolean> = of(false);

  projects$: Observable<Project[]> = of([
    {
      id: 101,
      name: 'API Assistant',
      createOps: 10,
      readOps: 22,
      updateOps: 33,
      deleteOps: 22,
      storageSize: 22,
      aggregate: 33
    },
    {
      id: 102,
      name: 'API Assistant',
      createOps: 10,
      readOps: 22,
      updateOps: 33,
      deleteOps: 22,
      storageSize: 22,
      aggregate: 33
    },
    {
      id: 103,
      name: 'API Assistant',
      createOps: 10,
      readOps: 22,
      updateOps: 33,
      deleteOps: 22,
      storageSize: 22,
      aggregate: 33
    },
    {
      id: 104,
      name: 'API Assistant',
      createOps: 10,
      readOps: 22,
      updateOps: 33,
      deleteOps: 22,
      storageSize: 22,
      aggregate: 33
    },
    {
      id: 105,
      name: 'API Assistant',
      createOps: 10,
      readOps: 22,
      updateOps: 33,
      deleteOps: 22,
      storageSize: 22,
      aggregate: 33
    }
  ])

  constructor(
    private swDialogService: SwDialogService
  ) {}

  ngOnInit(): void {
  }

  public trackProject(_: number, project: Project) {
    return project.id;
  } 

  public openCreateProjectModal() {
    const ref = this.swDialogService.open(CreateProjectComponent)
    ref.afterClosed$.subscribe(console.log)
  }

}
