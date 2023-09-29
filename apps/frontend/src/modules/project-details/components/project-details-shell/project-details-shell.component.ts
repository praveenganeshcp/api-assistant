import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwTabViewComponent,
  SwTabComponent,
  SwTabTitleComponent,
  SwTabContentComponent,
  SwIconComponent
} from "ngx-simple-widgets";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { ProjectHomeComponent } from "../project-home/project-home.component"
import { ProjectLogsComponent } from "../project-logs/project-logs.component"
import { ProjectDatabaseComponent } from "../project-database/project-database.component"
import { ProjectSettingsComponent } from "../project-settings/project-settings.component"
import { ProjectFilesComponent } from "../project-files/project-files.component"
import { BreakPointObserver } from "../../../app/services/breakpointobserver.service";

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
    ProjectLogsComponent,
    ProjectDatabaseComponent,
    ProjectSettingsComponent,
    ProjectFilesComponent
  ],
  templateUrl: './project-details-shell.component.html',
  styleUrls: ['./project-details-shell.component.scss'],
})
export class ProjectDetailsShellComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver
  ) {}

  public get projectId(): number {
    return parseInt(this.activatedRoute.snapshot.params['projectId'], 10);
  }

  activeTabIndex = 2;

  public isDesktopScreen$ = this.breakpointObserver.isDesktopScreen$;

  onTabChange(index: number) {
    this.activeTabIndex = index;
  }

}
